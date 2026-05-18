import { test, expect } from '../../testFixtures';

test('Just login', async ({ loginPage }) => {
    await expect(loginPage.locator('.oxd-sidepanel')).toBeVisible();
    await loginPage.waitForTimeout(10000);
})