import { test, expect } from '../../utils/testFixtures';
import { SignUpLoginPage } from '../../pages/auth/signUpLogin.page';
import { fa, faker } from '@faker-js/faker';
import { SIGNUP_LOGIN_DATA } from '../../utils/testData';


let signUpLoginPage: SignUpLoginPage;

test.beforeEach(async ({ page }) => {
    signUpLoginPage = new SignUpLoginPage(page);
});

test('Sign up with wrong email', async ({ signupPage }) => {
    await signUpLoginPage.nameField.fill(faker.person.fullName());
    await signUpLoginPage.emailField.fill(SIGNUP_LOGIN_DATA.fieldValues.emailWithoutAt);
    await signUpLoginPage.signUpButton.click();
    const validationMessage = await signUpLoginPage.emailField.evaluate(
        (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).toBe(SIGNUP_LOGIN_DATA.errorTexts.noAtinEmail);
});

test('Sign up with existing email', async ({ signupPage }) => {
    await signUpLoginPage.nameField.fill(faker.person.fullName());
    await signUpLoginPage.emailField.fill(SIGNUP_LOGIN_DATA.fieldValues.existingEmail);
    await signUpLoginPage.signUpButton.click();

    await expect(signUpLoginPage.existingEmailError).toHaveText(SIGNUP_LOGIN_DATA.errorTexts.emailAlreadyExists, { timeout: 5000 });
});

test('Mandatory field Validations', async ({ signupPage }) => {
    await signUpLoginPage.signUpButton.click();
    let emptyFieldValidationMessage = await signUpLoginPage.nameField.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(emptyFieldValidationMessage).toBe(SIGNUP_LOGIN_DATA.errorTexts.emptyField);

    await signUpLoginPage.nameField.fill(faker.person.fullName());
    await signUpLoginPage.signUpButton.click();
    emptyFieldValidationMessage = await signUpLoginPage.emailField.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(emptyFieldValidationMessage).toBe(SIGNUP_LOGIN_DATA.errorTexts.emptyField);
});

test('Sign up happy flow', async ({ signupPage }) => {
    await signUpLoginPage.nameField.fill(faker.person.fullName());
    await signUpLoginPage.emailField.fill(faker.internet.email());
    await signUpLoginPage.signUpButton.click();

    await signUpLoginPage.enterAccountInfoHeader.waitFor({ state: 'visible', timeout: 5000 });
    await (await signUpLoginPage.selectTitle('Mrs')).click();
    await signUpLoginPage.passwordField.fill(SIGNUP_LOGIN_DATA.fieldValues.password);
    await signUpLoginPage.daysDropdown.selectOption(faker.number.int({ min: 1, max: 28 }).toString());
    await signUpLoginPage.monthsDropdown.selectOption(faker.date.month());
    await signUpLoginPage.yearsDropdown.selectOption(faker.number.int({ min: 1900, max: 2021 }).toString());
    await signUpLoginPage.firstNameField.fill(faker.person.firstName());
    await signUpLoginPage.lastNameField.fill(faker.person.lastName());
    await signUpLoginPage.addressField.fill(faker.location.streetAddress());
    await signUpLoginPage.countryDropdown.selectOption(SIGNUP_LOGIN_DATA.fieldValues.country);
    await signUpLoginPage.stateField.fill(faker.location.state());
    await signUpLoginPage.cityField.fill(faker.location.city());
    await signUpLoginPage.zipcodeField.fill(faker.location.zipCode());
    await signUpLoginPage.mobileNumberField.fill(faker.phone.number());
    await signUpLoginPage.createAccountButton.click();
    await expect(signUpLoginPage.accountCreatedHeader).toBeVisible({ timeout: 20000 });
});