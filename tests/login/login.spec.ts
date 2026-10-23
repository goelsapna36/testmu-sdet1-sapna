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
  await expect(page.locator("#dashboard")).toBeHidden();
});

test("empty email is blocked by required-field validation", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Email").fill("");
  await page.getByRole("button", { name: "Sign in" }).click();

  const emailHasRequiredError = await page
    .locator("#email")
    .evaluate((element: HTMLInputElement) => element.validity.valueMissing);
  expect(emailHasRequiredError).toBe(true);
  await expect(page.locator("#dashboard")).toBeHidden();
});

test("forgot password shows a neutral confirmation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Forgot password?" }).click();

  await expect(page.getByRole("alert")).toContainText(
    "Password reset instructions would be sent if the account exists."
  );
  await expect(page.locator("#login")).toBeVisible();
});

test(
  "failure explainer integration can analyze a real assertion failure",
  async ({ page }, testInfo) => {
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

    const explanation = await explainFailure(evidence);
    await testInfo.attach("ai-failure-explanation.md", {
      body: explanation,
      contentType: "text/markdown",
    });
    expect(explanation.length).toBeGreaterThan(20);
  }
);
