import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("shows 8 hours as default", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("08:00:00")).toBeVisible();
  });

  test("contains start button", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("button").first()).toHaveText("Start");
  });

  test("reduces work time after running timer", async ({ page }) => {
    await page.goto("/");
    await page.locator("button").first().click();
    await page.waitForTimeout(1000);
    await page.locator("button").first().click();
    await expect(page.getByText("07:59")).toBeVisible();
  });
});
