import { test, expect } from "@playwright/test";

async function signIn(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByLabel("Email").fill("qa@example.com");
  await page.getByLabel("Password").fill("Passw0rd!");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(
    page.getByRole("heading", { name: "Dashboard", exact: true })
  ).toBeVisible();
}

test("dashboard widgets show expected data and filter correctly", async ({ page }) => {
  await signIn(page);
  await expect(page.getByText("Sales: 120")).toBeVisible();
  await expect(page.getByText("Users: 42")).toBeVisible();

  await page.getByLabel("Filter widgets").selectOption("users");
  await expect(page.getByText("Users: 42")).toBeVisible();
  await expect(page.getByText("Sales: 120")).toBeHidden();

  await page.getByLabel("Filter widgets").selectOption("sales");
  await expect(page.getByText("Sales: 120")).toBeVisible();
  await expect(page.getByText("Users: 42")).toBeHidden();

  await page.getByLabel("Filter widgets").selectOption("all");
  await expect(page.getByText("Sales: 120")).toBeVisible();
  await expect(page.getByText("Users: 42")).toBeVisible();
});

test("logout returns user to login", async ({ page }) => {
  await signIn(page);
  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await expect(page.locator("#dashboard")).toBeHidden();
});

test("dashboard remains usable at a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await signIn(page);
  await expect(page.getByText("Sales: 120")).toBeVisible();
  await expect(page.getByText("Users: 42")).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  expect(hasHorizontalOverflow).toBe(false);
});
