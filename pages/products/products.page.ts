import { PAGE_NAMES } from '../../utils/testData';
import { UtilsPage } from '../../utils/page';
import { Page } from '@playwright/test';

export class ProductsPage extends UtilsPage {

    readonly searchProductField: ReturnType<Page['locator']>;
    readonly searchProductButton: ReturnType<Page['locator']>
    readonly viewProductButton: ReturnType<Page['locator']>;
    readonly productCategory: ReturnType<Page['locator']>;
    readonly productPrice: ReturnType<Page['locator']>;
    readonly productAvailability: ReturnType<Page['locator']>;
    readonly productCondition: ReturnType<Page['locator']>;
    readonly productBrand: ReturnType<Page['locator']>;
    readonly addtoCartButtonOnDetailsPage: ReturnType<Page['locator']>;
    readonly addedToCartSuccessMessage: ReturnType<Page['locator']>;
    readonly continueShoppingButton: ReturnType<Page['locator']>;

    constructor(page: Page) {
        super(page);
        this.searchProductField = page.getByPlaceholder('Search Product');
        this.searchProductButton = this.getElementFromCSS('id', 'submit_search');
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
        await this.goToTab(PAGE_NAMES.products);
    }

    async getProductByName(productName: string) {
        return this.page.getByText(productName, { exact: true }).first();
    }

    async getProductNameHeadingOnDetailsPage(productName: string) {
        return this.page.getByRole('heading', { name: productName });
    }

    async getProductCardByName(productName: string) {
        return this.getElementFromCSS('class', 'productinfo text-center', 'div')
            .filter({ hasText: productName });
    }

}