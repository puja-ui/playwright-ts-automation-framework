import { test, expect } from '../../utils/testFixtures';
import { SignUpLoginPage } from '../../pages/auth/signUpLogin.page';
import { CartPage } from '../../pages/cart/cart.page';
import { PRODUCTS, ADDRESS_DETAILS, PAYMENT } from '../../utils/testData';
import { CheckoutPage } from '../../pages/checkout/checkout.page';
import { faker } from '@faker-js/faker';
/*
 * Test cases to cover:

    -> Complete checkout as logged-in user
    -> Checkout redirects to login if not authenticated
    -> Order confirmation page shows correct details
    -> Payment form validation

    New concepts:

    Multi-step workflow testing
    Chaining page objects across steps
    End-to-end happy path test
 */

let loginPage: SignUpLoginPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.beforeEach(async ({ page }) => {
   loginPage = new SignUpLoginPage(page);
   cartPage = new CartPage(page);
   checkoutPage = new CheckoutPage(page);
});

test('Purchasing order - happy flow', async ({ signupPage }) => {
   await loginPage.loginAsJaneDoe();

   await cartPage.featuredItemsHeader.waitFor({ state: 'visible', timeout: 10000 });
   await cartPage.addToCardFromlistingPage(PRODUCTS[0]);
   await cartPage.goToCartTab();
   await cartPage.proceedToCheckoutButton.click();

   await checkoutPage.verifyDeliveryAddress(ADDRESS_DETAILS.JaneDoe);
   await checkoutPage.verifyBillingAddress(ADDRESS_DETAILS.JaneDoe);
   await expect(await cartPage.getCartItemByName(PRODUCTS[0]))
      .toBeVisible({ timeout: 10000 });
   await checkoutPage.placeOrderButton.click();

   await expect(checkoutPage.paymentHeader).toBeVisible({ timeout: 10000 });
   await checkoutPage.fillPaymentDetails(PAYMENT.freshCard);
   await expect(checkoutPage.orderConfirmationMessage).toBeVisible({ timeout: 10000 });

});
