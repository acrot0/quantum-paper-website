import { test, expect } from '@playwright/test';

test.describe('Paper Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/paper');
  });

  test('displays section content', async ({ page }) => {
    await page.waitForSelector('#abstract', { timeout: 10000 });
    const abstract = page.locator('#abstract');
    await expect(abstract).toBeVisible();
  });

  test('shows section jump buttons', async ({ page }) => {
    await page.waitForSelector('#abstract', { timeout: 10000 });
    const abstractBtn = page.getByRole('button', { name: /abstract/i }).first();
    await expect(abstractBtn).toBeVisible();
    const introBtn = page.getByRole('button', { name: /introduction/i }).first();
    await expect(introBtn).toBeVisible();
    const methodBtn = page.getByRole('button', { name: /methodology/i }).first();
    await expect(methodBtn).toBeVisible();
    const expBtn = page.getByRole('button', { name: /experiments/i }).first();
    await expect(expBtn).toBeVisible();
  });

  test('scroll progress bar exists', async ({ page }) => {
    await page.waitForSelector('#abstract', { timeout: 10000 });
    const progressBar = page.locator('div.fixed.top-16.left-0.right-0');
    await expect(progressBar).toBeVisible();
  });

  test('navigates to section via jump button', async ({ page }) => {
    await page.waitForSelector('#abstract', { timeout: 10000 });
    const methodBtn = page.getByRole('button', { name: /methodology/i }).first();
    await methodBtn.click();
    await expect(page).toHaveURL(/\/paper\/methodology/);
    await expect(page.locator('#methodology')).toBeVisible();
  });
});
