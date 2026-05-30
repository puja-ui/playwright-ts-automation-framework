
import { test, expect } from '../../utils/testFixtures';
import { ProductsPage } from '../../pages/products/products.page';
import { PRODUCTS, PRODUCT_DETAILS } from '../../utils/testData';
/**
 * Test cases to cover:

    -> All products are visible on homepage
    -> Search for a valid product returns results
    -> Search for an invalid product shows "no products found"
    -> Click a product opens the correct product detail page
    -> Product detail page shows name, price, description, category
    -> Add to cart from product listing page
    -> Add to cart from product detail page

    New Playwright concepts this introduces:

    Handling lists of elements — locator.all() and locator.count()
    Filtering locators — locator.filter({ hasText: 'Blue Top' })
    Asserting on dynamic content
 */

let productsPage: ProductsPage;

test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
});

test('All products are visible on homepage', async ({ homePage }) => {
    await productsPage.goToProductsTab();
    for (const product of PRODUCTS) {
        await expect(await productsPage.getProductByName(product))
            .toBeVisible({ timeout: 10000 });
    }
});

test('Search for a valid product returns results', async ({ homePage }) => {
    await productsPage.goToProductsTab();
    await productsPage.searchProductField.fill(PRODUCTS[10]);
    await productsPage.searchProductButton.click();
    await expect(await productsPage.getProductByName(PRODUCTS[10]))
        .toBeVisible({ timeout: 10000 });
});

test('Search for an invalid product shows "no products found"', async ({ homePage }) => {
    await productsPage.goToProductsTab();
    await productsPage.searchProductField.fill('sdfghjk');
    await productsPage.searchProductButton.click();
    for (const product of PRODUCTS) {
        await expect(await productsPage.getProductByName(product))
            .toBeHidden({ timeout: 10000 });
    }
});

test('Click a product opens the correct product detail page', async ({ homePage }) => {
    await productsPage.goToProductsTab();
    await productsPage.searchProductField.fill(PRODUCT_DETAILS.productName);
    await productsPage.searchProductButton.click();
    await expect(await productsPage.getProductByName(PRODUCT_DETAILS.productName))
        .toBeVisible({ timeout: 10000 });
    await productsPage.viewProductButton.click();

    await expect(await productsPage.getProductNameHeadingOnDetailsPage(PRODUCT_DETAILS.productName))
        .toBeVisible({ timeout: 10000 });
    await expect(productsPage.productCategory)
        .toContainText(PRODUCT_DETAILS.category, { timeout: 10000 });
    await expect(productsPage.productPrice)
        .toContainText(PRODUCT_DETAILS.price, { timeout: 10000 });
    await expect(productsPage.productAvailability)
        .toContainText(PRODUCT_DETAILS.availability, { timeout: 10000 });
    await expect(productsPage.productCondition)
        .toContainText(PRODUCT_DETAILS.condition, { timeout: 10000 });
    await expect(productsPage.productCondition)
        .toContainText(PRODUCT_DETAILS.brand, { timeout: 10000 });
});

test('Add to cart from product detail page', async ({ homePage }) => {
    await productsPage.goToProductsTab();
    await productsPage.searchProductField.fill(PRODUCT_DETAILS.productName);
    await productsPage.searchProductButton.click();
    await expect(await productsPage.getProductByName(PRODUCT_DETAILS.productName))
    .toBeVisible({ timeout: 10000 });
    await productsPage.viewProductButton.click();

    await expect(await productsPage.getProductNameHeadingOnDetailsPage(PRODUCT_DETAILS.productName)).toBeVisible({ timeout: 10000 });
    await productsPage.addtoCartButtonOnDetailsPage.click();
    await expect(productsPage.addedToCartSuccessMessage).toBeVisible({ timeout: 10000 });
    await productsPage.continueShoppingButton.click();
})

test('Add to cart from product listing page', async ({ homePage }) => {
    await productsPage.goToProductsTab();
    const product = await productsPage.getProductCardByName(PRODUCT_DETAILS.productName);
    await product.getByText('Add to cart').click({ force: true });
    await expect(productsPage.addedToCartSuccessMessage).toBeVisible({ timeout: 10000 });
    await productsPage.continueShoppingButton.click();
})
