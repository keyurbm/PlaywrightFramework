import { test as baseTest } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { RegisterPage } from '../pages/RegisterPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { CsvHelper } from '../utils/CsvHelper';

//define types for page fixtures:
type pageFixtures = {
    basePage: BasePage,
    loginPage: LoginPage, //loginPage type is LoginPage
    homePage: HomePage,
    registerPage: RegisterPage,
    testData: Record<string, string>[],
    searchResultsPage: SearchResultsPage,
    productInfoPage: ProductInfoPage,
    
};

//extend playwright base test:

// inheritance without classes
// below we have used extend method - pageFixtures type of generics for my page repository
// inside extend method we have to supply object extend<pageFixtures>({ });
// use object is available inside the playwright test runner. Supply data/page objects to test methods using 'use' inbuilt callback function

//extend method having repository of pages.
export let test = baseTest.extend<pageFixtures>({

    basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    // arrow ==> function having two parameters 1. page - inbuilt destructuring & 2. use callback. Helping me to supply test data 
    loginPage: async ({ page }, use) => {   
        let loginPage = new LoginPage(page);
        // inside callback whatever you're writing it will be return. use method is used to return loginpage.
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    searchResultsPage: async ({ page }, use) => {
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

    registerPage: async ({ page }, use) => {
        let registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    productInfoPage: async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },
    
    testData: async ({ }, use) => {
        let testData = CsvHelper.readCsv('src/data/loginData.csv');
        await use(testData);
    }

});

export { expect } from '@playwright/test';

//page objects
//test data
//states .json
