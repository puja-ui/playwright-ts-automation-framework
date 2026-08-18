import { PAGE_NAMES } from '../../utils/testData';
import { goToTab } from '../../utils/page';
import { Page, expect, type Locator } from '@playwright/test';
import { ProductsPage } from '../products/products.page';



let productsPage: ProductsPage;

export class CartPage {
    readonly page: Page;
    readonly cartIsEmptyMessage: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly featuredItemsHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        productsPage = new ProductsPage(page);

        this.cartIsEmptyMessage = page.getByText('Cart is empty!');
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
        this.featuredItemsHeader = page.getByRole('heading', { name: 'Features Items' });
    }
    async goToCartTab() {
        await goToTab(this.page, PAGE_NAMES.cart);
    }

    async getCartItemByName(productName: string) {
        return this.page.locator('[id^="product-"]').filter({ hasText: productName });
    }

    async addToCardFromlistingPage(productName: string) {
        const product = await productsPage.getProductCardByName(productName);
        await product.hover();
        await product.locator('.overlay-content').getByText('Add to cart').click();
        await expect(productsPage.addedToCartSuccessMessage)
            .toBeVisible({ timeout: 10000 });
        await productsPage.continueShoppingButton.click();
    }

}