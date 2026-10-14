import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage loads readable content and its local assets', async ({ page }) => {
  const failures = [];
  const assets = [];
  page.on('response', (response) => {
    if (response.url().startsWith('http://127.0.0.1:4173/')) {
      if (response.status() >= 400) failures.push(response.url());
      if (['stylesheet', 'script', 'image'].includes(response.request().resourceType())) {
        assets.push(response.status());
      }
    }
  });
  page.on('requestfailed', (request) => failures.push(request.url()));
  page.on('pageerror', (error) => failures.push(error.message));

  const response = await page.goto('/');
  expect(response.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('main').locator('p').first()).not.toBeEmpty();
  await page.waitForLoadState('networkidle');
  expect(assets.length).toBeGreaterThan(0);
  expect(assets.every((status) => status >= 200 && status < 400)).toBe(true);
  expect(failures).toEqual([]);
});

test('keyboard navigation reaches the team', async ({ page }) => {
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Toggle navigation' });
  if (await menu.isVisible()) {
    await menu.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
  }
  const teamLink = page.getByRole('navigation').getByRole('link', { name: 'Team', exact: true });
  await teamLink.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#team$/);
  await expect(page.getByRole('heading', { name: 'Team', exact: true })).toBeInViewport();
});

test('content fits the viewport', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const sizes = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(sizes.content).toBeLessThanOrEqual(sizes.viewport);
  await page.screenshot({ path: testInfo.outputPath('homepage.png'), fullPage: true });
});

test('homepage passes automated accessibility checks', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('main')).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
    .analyze();
  expect(results.passes.length).toBeGreaterThan(0);
  expect(results.violations).toEqual([]);
});
