import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Quantum Kitchen Sinks/);
  });

  test('displays paper metrics', async ({ page }) => {
    const metricCards = page.locator('.grid > div');
    await expect(metricCards.nth(0).locator('.text-3xl')).toHaveText('0.8778');
    await expect(metricCards.nth(1).locator('.text-3xl')).toHaveText('0.7995');
  });

  test('has CTA button to read paper', async ({ page }) => {
    const cta = page.getByRole('link', { name: /start reading/i });
    await expect(cta).toBeVisible();
  });

  test('navigates to paper page', async ({ page }) => {
    await page.getByRole('link', { name: /start reading/i }).click();
    await expect(page).toHaveURL(/\/paper/);
  });
});
