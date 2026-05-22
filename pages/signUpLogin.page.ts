import { expect, type Page } from '@playwright/test';
import { UtilsPage } from '../utils/page';

export class SignUpLoginPage {

    readonly page: Page;
    readonly nameField: ReturnType<Page['getByPlaceholder']>;
    readonly emailField: ReturnType<Page['locator']>;
    readonly signUpButton: ReturnType<Page['locator']>;
    readonly existingEmailError: ReturnType<Page['locator']>;
    readonly enterAccountInfoHeader: ReturnType<Page['getByRole']>
    readonly daysDropdown : ReturnType<Page['locator']>;
    readonly monthsDropdown : ReturnType<Page['locator']>; 
    readonly yearsDropdown : ReturnType<Page['locator']>;
    readonly zipcodeField : ReturnType<Page['locator']>;
    readonly passwordField : ReturnType<Page['getByLabel']>;
    readonly firstNameField : ReturnType<Page['getByLabel']>;
    readonly lastNameField : ReturnType<Page['getByLabel']>;
    readonly addressField : ReturnType<Page['getByLabel']>;
    readonly countryDropdown : ReturnType<Page['getByLabel']>;
    readonly stateField : ReturnType<Page['getByLabel']>;
    readonly cityField : ReturnType<Page['getByLabel']>;
    readonly mobileNumberField : ReturnType<Page['getByLabel']>;
    readonly createAccountButton : ReturnType<Page['getByRole']>;
    readonly accountCreatedHeader : ReturnType<Page['getByText']>;

    constructor(page: Page) {
        this.page = page;
        this.nameField = page.getByPlaceholder('Name');
        this.emailField = UtilsPage.getElementFromCSS(page, 'data-qa', 'signup-email');
        this.signUpButton = UtilsPage.getElementFromCSS(page, 'data-qa', 'signup-button');
        this.existingEmailError = UtilsPage.getElementFromCSS(page, 'action', '/signup', 'form', 'p');
        this.enterAccountInfoHeader = page.getByRole('heading', { name: 'Enter Account Information' });
        this.daysDropdown = UtilsPage.getElementFromCSS(page, 'data-qa', 'days');
        this.monthsDropdown = UtilsPage.getElementFromCSS(page, 'data-qa', 'months');
        this.yearsDropdown = UtilsPage.getElementFromCSS(page, 'data-qa', 'years');
        this.zipcodeField = UtilsPage.getElementFromCSS(page, 'data-qa', 'zipcode');
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
    //TODO: Create unified getElementWithattributes method to avoid creating locators for each element and use it in the tests
    // list all inbuilt locator providers
    // make switch case

    async selectTitle(title: 'Mr' | 'Mrs'): Promise<ReturnType<Page['locator']>> {
        return UtilsPage.getElementFromCSS(this.page, 'value', title);
    }
}