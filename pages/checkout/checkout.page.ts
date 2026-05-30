import { PAGE_NAMES } from '../../utils/testData';
import { UtilsPage } from '../../utils/page';
import { Page, expect } from '@playwright/test';
import { ProductsPage } from '../products/products.page';

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

}