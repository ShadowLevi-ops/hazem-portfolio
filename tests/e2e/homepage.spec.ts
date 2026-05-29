import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check if the page loads
    await expect(page).toHaveTitle(/GiltMedia/);

    // Check for main navigation elements
    const logo = page.locator('img[alt="Hazem Logo"]');
    await expect(logo).toBeVisible();

    // Check for menu button
    const menuButton = page.locator('button').filter({ hasText: 'Menu' });
    await expect(menuButton).toBeVisible();
  });

  test('should open and close menu dropdown', async ({ page }) => {
    await page.goto('/');

    // Click menu button
    await page.click('[data-testid="menu-button"]');

    // Check if dropdown is visible
    const dropdown = page.locator('[data-testid="menu-dropdown"]');
    await expect(dropdown).toBeVisible();

    // Check for contact links
    await expect(page.locator('text=Email')).toBeVisible();
    await expect(page.locator('text=WhatsApp')).toBeVisible();

    // Close dropdown by clicking outside
    await page.click('body');
    await expect(dropdown).not.toBeVisible();
  });

  test('should have portfolio section', async ({ page }) => {
    await page.goto('/');

    // Check for portfolio section
    const portfolioSection = page.locator('#portfolio');
    await expect(portfolioSection).toBeVisible();

    // Check for "My Work" heading
    await expect(page.locator('text=My Work')).toBeVisible();

    // Check for filter buttons
    await expect(page.locator('text=All')).toBeVisible();
    await expect(page.locator('text=Photography')).toBeVisible();
    await expect(page.locator('text=Video')).toBeVisible();
  });

  test('should filter portfolio items', async ({ page }) => {
    await page.goto('/');

    // Wait for portfolio to load
    await page.waitForSelector('#portfolio');

    // Click on Photography filter
    await page.click('text=Photography');

    // Verify filter is active (you may need to adjust selector based on your implementation)
    const photographyFilter = page.locator('button:has-text("Photography")');
    await expect(photographyFilter).toHaveClass(/active/);

    // Click on Video filter
    await page.click('text=Video');

    const videoFilter = page.locator('button:has-text("Video")');
    await expect(videoFilter).toHaveClass(/active/);
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check if mobile layout is working
    await expect(page.locator('img[alt="Hazem Logo"]')).toBeVisible();
    await expect(page.locator('text=My Work')).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();

    await expect(page.locator('img[alt="Hazem Logo"]')).toBeVisible();
    await expect(page.locator('text=My Work')).toBeVisible();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // Check for alt texts on images
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }

    // Check for proper button labels
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const hasAriaLabel = await button.getAttribute('aria-label');
      const hasText = await button.textContent();

      // Button should have either aria-label or text content
      expect(
        hasAriaLabel || (hasText && hasText.trim().length > 0)
      ).toBeTruthy();
    }
  });

  test('should handle theme switching', async ({ page }) => {
    await page.goto('/');

    // Look for theme toggle button (adjust selector based on your implementation)
    const themeToggle = page.locator('[data-testid="theme-toggle"]');

    if (await themeToggle.isVisible()) {
      // Test theme switching
      await themeToggle.click();

      // Verify theme change (you may need to adjust this based on your implementation)
      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);

      // Switch back
      await themeToggle.click();
      await expect(html).not.toHaveClass(/dark/);
    }
  });
});
