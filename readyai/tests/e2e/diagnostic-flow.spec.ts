import { expect, test } from "@playwright/test";

test("homepage exposes diagnostic entry", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /start diagnostic/i })).toBeVisible();
  await expect(page.getByText(/adaptive placement readiness/i)).toBeVisible();
});
