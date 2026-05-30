import { expect, type Page } from '@playwright/test';
import { UtilsPage } from '../../utils/page';

export class SignUpLoginPage {

    readonly page: Page;
    readonly utils: UtilsPage;
    readonly nameField: ReturnType<Page['locator']>;
    readonly emailField: ReturnType<Page['locator']>;
    readonly signUpButton: ReturnType<Page['locator']>;
    readonly existingEmailError: ReturnType<Page['locator']>;
    readonly enterAccountInfoHeader: ReturnType<Page['locator']>
    readonly daysDropdown : ReturnType<Page['locator']>;
    readonly monthsDropdown : ReturnType<Page['locator']>; 
    readonly yearsDropdown : ReturnType<Page['locator']>;
    readonly zipcodeField : ReturnType<Page['locator']>;
    readonly passwordField : ReturnType<Page['locator']>;
    readonly firstNameField : ReturnType<Page['locator']>;
    readonly lastNameField : ReturnType<Page['locator']>;
    readonly addressField : ReturnType<Page['locator']>;
    readonly countryDropdown : ReturnType<Page['locator']>;
    readonly stateField : ReturnType<Page['locator']>;
    readonly cityField : ReturnType<Page['locator']>;
    readonly mobileNumberField : ReturnType<Page['locator']>;
    readonly createAccountButton : ReturnType<Page['locator']>;
    readonly accountCreatedHeader : ReturnType<Page['locator']>;

    constructor(page: Page) {
        this.page = page;
        this.utils = new UtilsPage(page);
        this.nameField = page.getByPlaceholder('Name');
        this.emailField = this.utils.getElementFromCSS('data-qa', 'signup-email');
        this.signUpButton = this.utils.getElementFromCSS('data-qa', 'signup-button');
        this.existingEmailError = this.utils.getElementFromCSS('action', '/signup', 'form', 'p');
        this.enterAccountInfoHeader = page.getByRole('heading', { name: 'Enter Account Information' });
        this.daysDropdown = this.utils.getElementFromCSS('data-qa', 'days');
        this.monthsDropdown = this.utils.getElementFromCSS('data-qa', 'months');
        this.yearsDropdown = this.utils.getElementFromCSS('data-qa', 'years');
        this.zipcodeField = this.utils.getElementFromCSS('data-qa', 'zipcode');
        this.passwordField = page.getByLabel('Password');
        this.firstNameField = page.getByLabel('First name');
        this.lastNameField = page.getByLabel('Last name');
        this.addressField = page.getByLabel('Address').first();
        this.countryDropdown = page.getByLabel('Country');
        this.stateField = page.getByLabel('State');
        this.cityField = page.getByLabel('City');
        this.mobileNumberField = page.getByLabel('Mobile Number');
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
        this.accountCreatedHeader = page.getByText('Account Created!');

    }

    async selectTitle(title: 'Mr' | 'Mrs'): Promise<ReturnType<Page['locator']>> {
        return this.utils.getElementFromCSS('value', title);
    }
}