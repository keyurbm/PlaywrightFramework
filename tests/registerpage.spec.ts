

import { expect, test } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async ({ registerPage }) => {
    await registerPage.goToRegisterPage();
    
});

test('Register Account page title test', async ({ registerPage }) => {
    const pageTitle = await registerPage.getRegisterPageTitle();
    console.log('register account page title', pageTitle);
    expect(pageTitle).toBe('Register Account');
});

let testData = CsvHelper.readCsv('src/data/registerData.csv');
for (let row of testData) {
    test(`Registration Account page test with valid data - ${row.email}`, async ({ registerPage, page}) => {
        await registerPage.doRegister(row.firstname, row.lastname, row.email, row.telephone, row.password, row.passwordconfirm);
         expect(await registerPage.isSuccessMsgDisplayed()).toBeTruthy();
    });
};

