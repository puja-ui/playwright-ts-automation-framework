import {test as base, expect, Page} from '@playwright/test';
import {urls, creds} from './utils/auth';

type AuthFixtures = {
    loginPage: Page;
}

const test = base.extend<AuthFixtures> ({
    loginPage: async ({page}, use) => {
        await page.goto(urls.launch_url);
        await expect(page).toHaveTitle(/Automation Exercise/);
        await use(page);
    }
})

export {test, expect}

//https://automationexercise.com/
///for automation project