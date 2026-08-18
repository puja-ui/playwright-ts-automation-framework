import { PAGE_NAMES, ADDRESS_DETAILS } from '../../utils/testData';
import { getElementFromCSS } from '../../utils/page';
import { Page, expect, type Locator } from '@playwright/test';
import { ProductsPage } from '../products/products.page';
import { AddressDetails, CardDetails } from '../../utils/typeDefinitions';

export class CheckoutPage {

    readonly page: Page;
    readonly deliveryAddressBox: Locator;
    readonly billingAddressBox: Locator;
    readonly placeOrderButton: Locator;
    readonly paymentHeader: Locator;
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly CVCInput: Locator;
    readonly expirationMonthInput: Locator;
    readonly expirationYearInput: Locator;
    readonly payAndConfirmOrderButton: Locator;
    readonly orderConfirmationMessage: Locator;


    constructor(page: Page) {
        this.page = page;

        this.deliveryAddressBox = getElementFromCSS(page, 'id', 'address_delivery', 'ul');
        this.billingAddressBox = getElementFromCSS(page, 'id', 'address_invoice', 'ul');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
        this.paymentHeader = page.getByRole('heading', { name: 'Payment' });
        this.nameOnCardInput = getElementFromCSS(page, 'data-qa', 'name-on-card');
        this.cardNumberInput = getElementFromCSS(page, 'data-qa', 'card-number');
        this.CVCInput = getElementFromCSS(page, 'data-qa', 'cvc');
        this.expirationMonthInput = getElementFromCSS(page, 'data-qa', 'expiry-month');
        this.expirationYearInput = getElementFromCSS(page, 'data-qa', 'expiry-year');
        this.payAndConfirmOrderButton = page.getByRole('button', { name: 'Pay and Confirm Order' });
        this.orderConfirmationMessage = page.locator('p').filter({ hasText: 'Congratulations! Your order has been confirmed!' });
    }

    async verifyDeliveryAddress(details: AddressDetails): Promise<void> {
        await expect(this.deliveryAddressBox.locator('.address_firstname'))
            .toHaveText(details.name);
        await expect(this.deliveryAddressBox.locator('.address_address1').nth(1))
            .toHaveText(details.address1);
        await expect(this.deliveryAddressBox.locator('.address_city'))
            .toHaveText(details.cityStatePostcode);
        await expect(this.deliveryAddressBox.locator('.address_country_name'))
            .toHaveText(details.country);
        await expect(this.deliveryAddressBox.locator('.address_phone'))
            .toHaveText(details.mobileNumber);
    }

    async verifyBillingAddress(details: AddressDetails): Promise<void> {
        await expect(this.billingAddressBox.locator('.address_firstname'))
            .toHaveText(details.name);
        await expect(this.billingAddressBox.locator('.address_address1').nth(1))
            .toHaveText(details.address1);
        await expect(this.billingAddressBox.locator('.address_city'))
            .toHaveText(details.cityStatePostcode);
        await expect(this.billingAddressBox.locator('.address_country_name'))
            .toHaveText(details.country);
        await expect(this.billingAddressBox.locator('.address_phone'))
            .toHaveText(details.mobileNumber);
    }

    async fillPaymentDetails(card: CardDetails): Promise<void> {
        await this.nameOnCardInput.fill(card.nameOnCard)
        await this.cardNumberInput.fill(card.cardNumber)
        await this.CVCInput.fill(card.CVC)
        await this.expirationMonthInput.fill(card.expirationMonth)
        await this.expirationYearInput.fill(card.expirationYear)
      }
}