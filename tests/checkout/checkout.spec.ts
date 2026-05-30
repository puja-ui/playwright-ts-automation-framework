import { test, expect } from '../../utils/testFixtures';
import { SignUpLoginPage } from '../../pages/auth/signUpLogin.page';
import { CartPage } from '../../pages/cart/cart.page';
import { PRODUCTS, ADDRESS_DETAILS } from '../../utils/testData';
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
   await cartPage.featuredIteamsHeader.waitFor({ state: 'visible', timeout: 10000 });

   await cartPage.addToCardFromlistingPage(PRODUCTS[0]);

   await cartPage.goToCartTab();
   await cartPage.proceedToCheckoutButton.click();

   await expect(checkoutPage.deliveryAddressBox.locator('.address_firstname'))
      .toHaveText(ADDRESS_DETAILS.JaneDoe.name);
   await expect(checkoutPage.deliveryAddressBox.locator('.address_address1').nth(1))
      .toHaveText(ADDRESS_DETAILS.JaneDoe.address1);
   await expect(checkoutPage.deliveryAddressBox.locator('.address_city'))
      .toHaveText(ADDRESS_DETAILS.JaneDoe.cityStatePostcode);
   await expect(checkoutPage.deliveryAddressBox.locator('.address_country_name'))
      .toHaveText(ADDRESS_DETAILS.JaneDoe.country);
   await expect(checkoutPage.deliveryAddressBox.locator('.address_phone'))
      .toHaveText(ADDRESS_DETAILS.JaneDoe.mobileNumber);

   await expect(checkoutPage.billingAddressBox.locator('.address_firstname'))
      .toHaveText(ADDRESS_DETAILS.JaneDoe.name);
   await expect(checkoutPage.billingAddressBox.locator('.address_address1').nth(1))
      .toHaveText(ADDRESS_DETAILS.JaneDoe.address1);
   await expect(checkoutPage.billingAddressBox.locator('.address_city'))
      .toHaveText(ADDRESS_DETAILS.JaneDoe.cityStatePostcode);
   await expect(checkoutPage.billingAddressBox.locator('.address_country_name'))
      .toHaveText(ADDRESS_DETAILS.JaneDoe.country);
   await expect(checkoutPage.billingAddressBox.locator('.address_phone'))
      .toHaveText(ADDRESS_DETAILS.JaneDoe.mobileNumber);

   await expect(await cartPage.getCartItemByName(PRODUCTS[0]))
      .toBeVisible({ timeout: 10000 });
   await checkoutPage.placeOrderButton.click();
   await checkoutPage.placeOrderButton.waitFor({ state: 'hidden', timeout: 10000 });

   await expect(checkoutPage.paymentHeader).toBeVisible({ timeout: 10000 });
   await checkoutPage.nameOnCardInput.fill(faker.person.fullName());
   await checkoutPage.cardNumberInput.fill(faker.finance.creditCardNumber());
   await checkoutPage.CVCInput.fill(faker.finance.creditCardCVV());
   await checkoutPage.expirationMonthInput.fill(faker.number.int({ min: 1, max: 12 }).toString());
   await checkoutPage.expirationYearInput.fill(faker.number.int({ min: 2024, max: 2030 }).toString());
   await checkoutPage.payAndConfirmOrderButton.click();
   await expect(checkoutPage.orderConfirmationMessage).toBeVisible({ timeout: 10000 });

});
