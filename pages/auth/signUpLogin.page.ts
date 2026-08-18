import { expect, type Page, type Locator } from '@playwright/test';
import { getElementFromCSS, login } from '../../utils/page';
import { creds } from '../../utils/auth';

export class SignUpLoginPage {

    readonly page: Page;
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly signUpButton: Locator;
    readonly existingEmailError: Locator;
    readonly enterAccountInfoHeader: Locator;
    readonly daysDropdown : Locator;
    readonly monthsDropdown : Locator; 
    readonly yearsDropdown : Locator;
    readonly zipcodeField : Locator;
    readonly passwordField : Locator;
    readonly firstNameField : Locator;
    readonly lastNameField : Locator;
    readonly addressField : Locator;
    readonly countryDropdown : Locator;
    readonly stateField : Locator;
    readonly cityField : Locator;
    readonly mobileNumberField : Locator;
    readonly createAccountButton : Locator;
    readonly accountCreatedHeader : Locator;
    readonly automationExerciseLogo : Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameField = page.getByPlaceholder('Name');
        this.emailField = getElementFromCSS(page, 'data-qa', 'signup-email');
        this.signUpButton = getElementFromCSS(page, 'data-qa', 'signup-button');
        this.existingEmailError = getElementFromCSS(page, 'action', '/signup', 'form', 'p');
        this.enterAccountInfoHeader = page.getByRole('heading', { name: 'Enter Account Information' });
        this.daysDropdown = getElementFromCSS(page, 'data-qa', 'days');
        this.monthsDropdown = getElementFromCSS(page, 'data-qa', 'months');
        this.yearsDropdown = getElementFromCSS(page, 'data-qa', 'years');
        this.zipcodeField = getElementFromCSS(page, 'data-qa', 'zipcode');
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
        this.automationExerciseLogo = page.getByAltText('Website for automation practice');

    }

    async selectTitle(title: 'Mr' | 'Mrs'): Promise<Locator> {
        return getElementFromCSS(this.page, 'value', title);
    }


    async loginAsJaneDoe() {
        await login(this.page, creds.janeDoe.username, creds.janeDoe.password);
    }
}