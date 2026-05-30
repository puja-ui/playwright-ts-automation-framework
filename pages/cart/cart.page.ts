import { PAGE_NAMES } from '../../utils/testData';
import { UtilsPage } from '../../utils/page';
import { Page } from '@playwright/test';

export class CartPage extends UtilsPage {
    constructor(page: Page) {
        super(page);
    }
    async goToCartTab() {
        await this.goToTab(PAGE_NAMES.cart);
    }
    
}