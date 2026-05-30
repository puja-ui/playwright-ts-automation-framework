import { PAGE_NAMES } from '../../utils/testData';
import { UtilsPage } from '../../utils/page';
import { Page, expect } from '@playwright/test';
import { ProductsPage } from '../products/products.page';



let productsPage: ProductsPage;

export class CartPage extends UtilsPage {

    readonly cartIsEmptyMessage: ReturnType<Page['locator']>
    readonly proceedToCheckoutButton: ReturnType<Page['locator']>;

    constructor(page: Page) {
        super(page);
        productsPage = new ProductsPage(page);

        this.cartIsEmptyMessage = page.getByText('Cart is empty!');
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
    }
    async goToCartTab() {
        await this.goToTab(PAGE_NAMES.cart);
    }

    async getCartItemByName(productName: string) {
        return this.page.locator('[id^="product-"]').filter({ hasText: productName });
    }

    async addToCardFromlistingPage(productName: string) {
        const product = await productsPage.getProductCardByName(productName);
        await product.getByText('Add to cart').click({ force: true });
        await expect(productsPage.addedToCartSuccessMessage)
            .toBeVisible({ timeout: 10000 });
        await productsPage.continueShoppingButton.click();
    }

}