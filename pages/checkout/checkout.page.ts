import { PAGE_NAMES, ADDRESS_DETAILS } from '../../utils/testData';
import { UtilsPage } from '../../utils/page';
import { Page, expect } from '@playwright/test';
import { ProductsPage } from '../products/products.page';
import { AddressDetails, CardDetails } from '../../utils/typeDefinitions';

export class CheckoutPage extends UtilsPage {

    readonly deliveryAddressBox: ReturnType<Page['locator']>;
    readonly billingAddressBox: ReturnType<Page['locator']>;
    readonly placeOrderButton: ReturnType<Page['locator']>;
    readonly paymentHeader: ReturnType<Page['locator']>;
    readonly nameOnCardInput: ReturnType<Page['locator']>;
    readonly cardNumberInput: ReturnType<Page['locator']>;
    readonly CVCInput: ReturnType<Page['locator']>;
    readonly expirationMonthInput: ReturnType<Page['locator']>;
    readonly expirationYearInput: ReturnType<Page['locator']>;
    readonly payAndConfirmOrderButton: ReturnType<Page['locator']>;
    readonly orderConfirmationMessage: ReturnType<Page['locator']>;


    constructor(page: Page) {
        super(page);

        this.deliveryAddressBox = this.getElementFromCSS('id', 'address_delivery', 'ul');
        this.billingAddressBox = this.getElementFromCSS('id', 'address_invoice', 'ul');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
        this.paymentHeader = page.getByRole('heading', { name: 'Payment' });
        this.nameOnCardInput = this.getElementFromCSS('data-qa', 'name-on-card');
        this.cardNumberInput = this.getElementFromCSS('data-qa', 'card-number');
        this.CVCInput = this.getElementFromCSS('data-qa', 'cvc');
        this.expirationMonthInput = this.getElementFromCSS('data-qa', 'expiry-month');
        this.expirationYearInput = this.getElementFromCSS('data-qa', 'expiry-year');
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