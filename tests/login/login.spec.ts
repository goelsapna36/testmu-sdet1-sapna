
import { test, expect } from "@playwright/test";
import { explainFailure } from "../../utils/failure-explainer";

test("valid login opens dashboard", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Email").fill("qa@example.com");
  await page.getByLabel("Password").fill("Passw0rd!");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(
    page.getByRole("heading", { name: "Dashboard", exact: true })
  ).toBeVisible();

  await expect(page.locator("#welcome")).toContainText("qa@example.com");
});

test("invalid login shows an error", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Email").fill("wrong@example.com");
  await page.getByLabel("Password").fill("wrong-password");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByRole("alert")).toHaveText(
    "Invalid email or password"
  );
});

test(
  "failure explainer integration can analyze a real assertion failure",
  async ({ page }, testInfo) => {
    // Skip only when the Gemini API key is not configured.
    if (!process.env.GEMINI_API_KEY) {
      test.skip(
        true,
        "Set GEMINI_API_KEY in .env to run the real Gemini integration."
      );
    }

    await page.goto("/");

    const evidence = {
      testTitle: "Dashboard heading expected but not visible",
      errorMessage:
        "Expected heading 'Dashboard' to be visible, but the locator timed out.",
      url: page.url(),
      pageText: (await page.locator("body").innerText()).slice(0, 1500),
    };

    // Make a real Gemini API call through the failure explainer.
    const explanation = await explainFailure(evidence);

    // Attach the actual LLM response to the Playwright test result.
    await testInfo.attach("ai-failure-explanation.md", {
      body: explanation,
      contentType: "text/markdown",
    });

    // Save evidence that the LLM returned a useful response.
    expect(explanation.length).toBeGreaterThan(20);
  }
);
