import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home to paper navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /start reading/i }).click();
    await expect(page).toHaveURL(/\/paper/);
  });

  test('paper to download navigation', async ({ page }) => {
    await page.goto('/paper');
    await page.getByRole('link', { name: /download/i }).click();
    await expect(page).toHaveURL(/\/download/);
  });

  test('download to home navigation via logo', async ({ page }) => {
    await page.goto('/download');
    await page.getByRole('link', { name: /rf spectrogram/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('header navigation from paper to home via logo', async ({ page }) => {
    await page.goto('/paper');
    await page.getByRole('link', { name: /rf spectrogram/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
