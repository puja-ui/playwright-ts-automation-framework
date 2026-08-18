import { expect, Locator, type Page } from '@playwright/test';
import { attributeType } from './typeDefinitions';

export function getElementFromCSS(page: Page, attributeType: attributeType, attributeValue: string, htmlTag ?: keyof HTMLElementTagNameMap, innerTag ?: keyof HTMLElementTagNameMap): Locator{
    let selector;
    switch (attributeType) {
        case 'data-qa':
        case 'action':
        case 'value':
            selector = `[${attributeType}="${attributeValue}"]`;
            break;
        case 'id':
            selector = `#${attributeValue}`;
            break;
        case 'class':
            selector = `.${attributeValue}`;
            break;
        default:
            throw new Error(`Unsupported attribute type: ${attributeType}`);
    }

    if(htmlTag) {
        selector = `${htmlTag}[${attributeType}="${attributeValue}"]`;
    }
    if(innerTag) {
        selector = `${selector} ${innerTag}`;
    }
    return page.locator(selector);
}

export async function goToTab(page: Page, pageName: string) {
    await page.getByRole('link', { name: pageName }).first().click();
    // await expect(page.getByRole('link', { name: pageName })).toHaveCSS('color', 'rgb(255, 165, 0)', {timeout: 10000})
}

export async function login(page: Page, username: string, password: string) {
    await page.goto('/login');
    await page.getByPlaceholder('Email Address').first().fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
}
