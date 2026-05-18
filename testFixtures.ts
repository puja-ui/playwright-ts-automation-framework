import {test as base, expect, Page} from '@playwright/test';
import {urls, creds} from './utils/auth';

type AuthFixtures = {
    loginPage: Page;
}

const test = base.extend<AuthFixtures> ({
    loginPage: async ({page}, use) => {
        await page.goto(urls.login);
        await expect(page.getByAltText('company-branding')).toBeVisible();
        await page.getByRole('textbox', {name: 'username'}).fill(creds.employee.username);
        await page.getByRole('textbox', {name: 'password'}).fill(creds.employee.password);
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page.getByAltText('client brand banner')).toBeVisible();
        await use(page);
    }
})

export {test, expect}