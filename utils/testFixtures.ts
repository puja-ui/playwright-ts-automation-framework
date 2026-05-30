import {test as base, expect, Page} from '@playwright/test';
import {urls} from './auth';

type AuthFixtures = {
    homePage: Page;
    signupPage: Page;
}

const test = base.extend<AuthFixtures> ({
    homePage: async ({page}, use) => {
        await page.goto(urls.launch_url);
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