import { expect, type Page } from '@playwright/test';

export class SignUpLoginPage {

    readonly page: Page;
    readonly nameField: ReturnType<Page['getByPlaceholder']>;
    readonly emailField: ReturnType<Page['locator']>;
    readonly signUpButton: ReturnType<Page['locator']>;
    readonly existingEmailError: ReturnType<Page['locator']>;
    readonly enterAccountInfoHeader: ReturnType<Page['locator']>

    constructor(page: Page) {
        this.page = page;
        this.nameField = page.getByPlaceholder('Name');
        this.emailField = page.locator('[data-qa="signup-email"]');
        this.signUpButton = page.locator('[data-qa="signup-button"]');
        this.existingEmailError = page.locator('form[action="/signup"] p');
        this.enterAccountInfoHeader = page.locator('//b[text()="Enter Account Information"]');
    }
    
}