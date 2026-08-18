import { PAGE_NAMES } from '../../utils/testData';
import { getElementFromCSS, goToTab } from '../../utils/page';
import { Page, type Locator } from '@playwright/test';

export class ProductsPage {

    readonly page: Page;
    readonly searchProductField: Locator;
    readonly searchProductButton: Locator;
    readonly viewProductButton: Locator;
    readonly productCategory: Locator;
    readonly productPrice: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;
    readonly addtoCartButtonOnDetailsPage: Locator;
    readonly addedToCartSuccessMessage: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchProductField = page.getByPlaceholder('Search Product');
        this.searchProductButton = getElementFromCSS(page, 'id', 'submit_search');
        this.viewProductButton = page.getByText('View Product');
        this.productCategory = page.locator('p').filter({ hasText: 'Category' });
        this.productPrice = page.locator('span').filter({ hasText: 'Rs.' }).nth(1);
        this.productAvailability = page.locator('p').filter({ hasText: 'Availability' });
        this.productCondition = page.locator('p').filter({ hasText: 'Condition' });
        this.productBrand = page.locator('p').filter({ hasText: 'Brand' });
        this.addtoCartButtonOnDetailsPage = page.getByRole('button', { name: 'Add to cart' });
        this.addedToCartSuccessMessage = page.getByRole('heading', { name: 'Added!' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    }
    async goToProductsTab() {
        await goToTab(this.page, PAGE_NAMES.products);
    }

    async getProductByName(productName: string) {
        return this.page.getByText(productName, { exact: true }).first();
    }

    async getProductNameHeadingOnDetailsPage(productName: string) {
        return this.page.getByRole('heading', { name: productName });
    }

    async getProductCardByName(productName: string) {
        return this.page.locator('.single-products').filter({ hasText: productName }).first();
    }

}