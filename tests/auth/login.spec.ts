import { test, expect } from '../../testFixtures';
import { SignUpLoginPage } from '../../pages/signUpLogin.page';
import { faker } from '@faker-js/faker';


let signUpLoginPage: SignUpLoginPage;

test.beforeEach(async ({ page }) => {
    signUpLoginPage = new SignUpLoginPage(page);
});

test('Sign up with wrong email', async ({ signupPage }) => {
    await signUpLoginPage.nameField.fill('Test User');
    await signUpLoginPage.emailField.fill('janedoe')
    await signUpLoginPage.signUpButton.click();
    const validationMessage = await signUpLoginPage.emailField.evaluate(
        (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).toBe("Please include an '@' in the email address. 'janedoe' is missing an '@'.");
    await signupPage.waitForTimeout(10000);
});

test('Sign up with existing email', async ({ signupPage }) => {
    await signUpLoginPage.nameField.fill('Test User');
    await signUpLoginPage.emailField.fill('janedoe@gmail.com');
    await signUpLoginPage.signUpButton.click();

    await expect(signUpLoginPage.existingEmailError).toHaveText('Email Address already exist!');

    await signupPage.waitForTimeout(10000);
});

test('Mandatory field Validations', async ({ signupPage }) => {
    await signUpLoginPage.signUpButton.click();
    let emptyFieldValidationMessage = await signUpLoginPage.nameField.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(emptyFieldValidationMessage).toBe('Please fill in this field.');

    await signUpLoginPage.nameField.fill('Test User');
    await signUpLoginPage.signUpButton.click();
    emptyFieldValidationMessage = await signUpLoginPage.emailField.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(emptyFieldValidationMessage).toBe('Please fill in this field.');

    await signupPage.waitForTimeout(10000);
});

test('Sign up happy flow', async ({ signupPage }) => {
    await signUpLoginPage.nameField.fill('Test User');
    await signUpLoginPage.emailField.fill(faker.internet.email());
    await signupPage.pause();
    await signUpLoginPage.signUpButton.click();

    await signUpLoginPage.enterAccountInfoHeader.waitFor({ state: 'visible', timeout: 5000 });
    await (await signUpLoginPage.selectTitle('Mrs')).click();
    await signUpLoginPage.passwordField.fill('testpassword');
    await signUpLoginPage.daysDropdown.selectOption('10');
    await signUpLoginPage.monthsDropdown.selectOption('May');
    await signUpLoginPage.yearsDropdown.selectOption('1990');
    await signUpLoginPage.firstNameField.fill('Jane');
    await signUpLoginPage.lastNameField.fill('Doe');
    await signUpLoginPage.addressField.fill('123 Main St');
    await signUpLoginPage.countryDropdown.selectOption('United States');
    await signUpLoginPage.stateField.fill('California');
    await signUpLoginPage.cityField.fill('Los Angeles');
    await signUpLoginPage.zipcodeField.fill('90001');
    await signUpLoginPage.mobileNumberField.fill('1234567890');
    await signUpLoginPage.createAccountButton.click();
    await expect(signUpLoginPage.accountCreatedHeader).toBeVisible({ timeout: 20000 });

    await signupPage.waitForTimeout(10000);
});

//checking green box