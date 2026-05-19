import {test as base, expect, Page} from '@playwright/test';
import {urls, creds} from './utils/auth';

type AuthFixtures = {
    loginPage: Page;
    signupPage: Page;
}

const test = base.extend<AuthFixtures> ({
    loginPage: async ({page}, use) => {
        await page.goto(urls.launch_url);
        await expect(page).toHaveTitle(/Automation Exercise/);
        await use(page);
    },
    signupPage: async ({loginPage}, use) => {
        await loginPage.getByRole('link', { name: 'Signup / Login' }).click();
        await expect(loginPage.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
        await use(loginPage);
    }
    
})

export {test, expect}

//https://automationexercise.com/
///for automation project