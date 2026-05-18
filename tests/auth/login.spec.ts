import { test, expect } from '../../testFixtures';

test('Sign up with wrong email', async ({ loginPage }) => {
    await loginPage.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(loginPage.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    await loginPage.getByPlaceholder('Name').fill('Test User');
    await loginPage.locator('[data-qa="signup-email"]').fill('janedoe')
    await loginPage.locator('[data-qa="signup-button"]').click();
    // await loginPage.pause()
    const validationMessage = await loginPage.locator('[data-qa="signup-email"]').evaluate(
        (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).toBe("Please include an '@' in the email address. 'janedoe' is missing an '@'.");
    await loginPage.waitForTimeout(10000);
});

test('Sign up with esisting email', async ({ loginPage }) => {
    await loginPage.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(loginPage.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    await loginPage.getByPlaceholder('Name').fill('Test User');
    await loginPage.locator('[data-qa="signup-email"]').fill('janedoe@gmail.com');
    await loginPage.locator('[data-qa="signup-button"]').click();

    await expect(loginPage.locator('form[action="/signup"] p')).toHaveText('Email Address already exist!');
    
    await loginPage.waitForTimeout(10000);
});