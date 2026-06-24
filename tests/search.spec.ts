import { expect, test } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});


//Data Provider from csv file
const productData = CsvHelper.readCsv('src/data/product.csv');
for (const row of productData) {
    test(`verify search results count - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage }) => {
        await homePage.doSearch(row.searchkey);
        expect(await searchResultsPage.getProductSearchResultsCount()).toBe(Number(row.resultcount));
    });

};

//verify user is able to click on product page i.e macbook pro
for (const row of productData) {
    test(`verify user is able to land on the product page - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage, page }) => {
        await homePage.doSearch(row.searchkey);
        await searchResultsPage.selectProduct(row.productname);
        expect(await page.title()).toBe(row.productname);
    });
};

// // hard coded value
//  test('verify product search count', async ({ homePage, searchResultsPage, page }) => {
//         await homePage.doSearch('macbook');
//         expect(await searchResultsPage.getProductSearchResultsCount()).toBe(Number(3));
//         await page.waitForTimeout(5000);
//     });

// test(`verify user is able to land on the product page or not`, async ({ homePage, searchResultsPage, page }) => {
//         await homePage.doSearch('macbook');
//         await searchResultsPage.selectProduct('MacBook Pro');
//         expect(await page.title()).toBe('MacBook Pro');
//     });

//common tests:
test('comp logo exists on product page', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('footers exist on product page', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
});