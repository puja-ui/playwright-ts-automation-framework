import { expect, Locator, type Page } from '@playwright/test';
import { attributeType } from './typeDefinitions';

export class UtilsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    getElementFromCSS(attributeType: attributeType, attributeValue: string, htmlTag ?: keyof HTMLElementTagNameMap, innerTag ?: keyof HTMLElementTagNameMap): Locator{
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
        return this.page.locator(selector);
    }
    async goToTab(pageName: string) {
        await this.page.getByRole('link', { name: pageName }).click();
        await expect(this.page.getByRole('link', { name: pageName })).toHaveCSS('color', 'rgb(255, 165, 0)', {timeout: 10000})
    }
}
