import {test as base, expect, Page} from '@playwright/test';

type AuthFixtures = {
    homePage: Page;
    signupPage: Page;
}

const test = base.extend<AuthFixtures> ({
    homePage: async ({page}, use) => {
        // Block Google Ads entirely. This is much faster and completely eliminates 
        // ad-related flakiness without needing to guess iframe names or click 'Close'.
        await page.route('**/*googlesyndication.com/**', route => route.abort());
        await page.route('**/*doubleclick.net/**', route => route.abort());
        await page.route('**/*ad.doubleclick.net/**', route => route.abort());

        await page.goto('/');
        await expect(page).toHaveTitle(/Automation Exercise/);
        await expect(page.getByAltText('Website for automation practice')).toBeVisible({timeout: 20000});
        await use(page);
    },
    signupPage: async ({homePage}, use) => {
        await homePage.getByRole('link', { name: 'Signup / Login' }).click();
        await expect(homePage.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
        await use(homePage);
    }
    
})

export {test, expect}

//https://automationexercise.com/
///for automation project