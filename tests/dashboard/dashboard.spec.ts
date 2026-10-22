import { test, expect } from "@playwright/test";

test("dashboard filter displays the selected widget", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Email").fill("qa@example.com");
  await page.getByLabel("Password").fill("Passw0rd!");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText("Sales: 120")).toBeVisible();
  await page.getByLabel("Filter widgets").selectOption("users");
  await expect(page.getByText("Users: 42")).toBeVisible();
  await expect(page.getByText("Sales: 120")).toBeHidden();
});

test("logout returns user to login", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Email").fill("qa@example.com");
  await page.getByLabel("Password").fill("Passw0rd!");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});
