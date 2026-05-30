import { test, expect } from '../../utils/testFixtures';
import { CartPage } from '../../pages/cart/cart.page';
import { ProductsPage } from '../../pages/products/products.page';
import { PRODUCT_DETAILS, PRODUCTS } from '../../utils/testData';

/**
 * 
 * Test cases to cover:

    -> Add single product to cart — verify it appears
    -> Add multiple products — verify count
    -> Remove product from cart — verify it disappears
    -> Cart persists after navigating away
    -> Proceed to checkout button is visible when cart has items
    -> Empty cart state is handled correctly

    New concepts:

    State management across pages
    API setup — add to cart via API, verify via UI
    Using authenticated fixture for cart tests
 */

let cartPage: CartPage;
let productsPage: ProductsPage;

test.beforeEach(async ({ page }) => {
   productsPage = new ProductsPage(page);
   cartPage = new CartPage(page);
});

test('Add single product to cart — verify it appears', async ({ homePage }) => {
   await productsPage.goToProductsTab();
   await cartPage.addToCardFromlistingPage(PRODUCT_DETAILS.productName);

   await cartPage.goToCartTab();
   await expect(await cartPage.getCartItemByName(PRODUCT_DETAILS.productName))
      .toBeVisible({ timeout: 10000 });
});

test('Add multiple products — verify count, proceed to checkout', async ({ homePage }) => {
      await productsPage.goToProductsTab();
      await cartPage.addToCardFromlistingPage(PRODUCTS[0]);
      await cartPage.addToCardFromlistingPage(PRODUCTS[1]);
      await cartPage.addToCardFromlistingPage(PRODUCTS[0]);
      await cartPage.addToCardFromlistingPage(PRODUCTS[2]);
   
      await cartPage.goToCartTab();
      await expect ( (await cartPage.getCartItemByName(PRODUCTS[0]))
         .locator('.cart_quantity')).toHaveText('2');
      await expect ( (await cartPage.getCartItemByName(PRODUCTS[1]))
         .locator('.cart_quantity')).toHaveText('1');
      await expect ( (await cartPage.getCartItemByName(PRODUCTS[2]))
         .locator('.cart_quantity')).toHaveText('1');

      await expect(cartPage.proceedToCheckoutButton).toBeVisible({ timeout: 10000 });
});

test('Remove product from cart — verify it disappears', async ({ homePage }) => {
      await productsPage.goToProductsTab();
      await cartPage.addToCardFromlistingPage(PRODUCT_DETAILS.productName);
   
      await cartPage.goToCartTab();
      const cartItem = await cartPage.getCartItemByName(PRODUCT_DETAILS.productName);
      await cartItem.locator('.cart_quantity_delete').click(); // Assuming this is the remove button
      await expect(cartItem).toBeHidden({ timeout: 10000 });
      await expect(cartPage.cartIsEmptyMessage).toBeVisible({ timeout: 10000 });
});
