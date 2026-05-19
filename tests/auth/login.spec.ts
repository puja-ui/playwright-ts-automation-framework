import { test, expect } from '../../testFixtures';
import { SignUpLoginPage } from '../../pages/signUpLogin.page';

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
    await signupPage.locator('[data-qa="signup-button"]').click();
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
    await signUpLoginPage.emailField.fill('janedoe1@mailsac.com');
    await signUpLoginPage.signUpButton.click();

    await signUpLoginPage.enterAccountInfoHeader.waitFor({ state: 'visible', timeout: 5000 });
    await signupPage.locator('input[value="Mrs"]').click();
    await signupPage.locator('[data-qa="password"]').fill('testpassword');
    await signupPage.locator('[data-qa="days"]').selectOption('10');
    await signupPage.locator('[data-qa="months"]').selectOption('May');
    await signupPage.locator('[data-qa="years"]').selectOption('1990');
    await signupPage.locator('#first_name').fill('Jane');
    await signupPage.locator('#last_name').fill('Doe');
    await signupPage.locator('#address1').fill('123 Main St');
    await signupPage.locator('#country').selectOption('United States');
    await signupPage.locator('#state').fill('California');
    await signupPage.locator('#city').fill('Los Angeles');
    await signupPage.locator('#zipcode').fill('90001');
    await signupPage.locator('#mobile_number').fill('1234567890');
    await signupPage.locator('[data-qa="create-account"]').click();
    await expect(signupPage.locator('//b[text()="Account Created!"]')).toBeVisible({ timeout: 20000 });

    await signupPage.waitForTimeout(10000);
});

//checking green box