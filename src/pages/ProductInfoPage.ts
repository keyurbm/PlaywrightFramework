

import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {

    //private Locators: 
    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private map: Map<string, string | number>; //define map at global level so that I can use it anywhere in my class

    //const... of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        this.productImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.map = new Map<string, string | number>();
    };

    //actions:
    async getProductHeader(): Promise<string> {
        return await this.header.innerText();
    }

    async getProductImagesCount(): Promise<number> {
        //await this.page.waitForTimeout(4000); //hard coded value for testing
        await this.productImages.first().waitFor({ state: 'visible' }); //first image visible on page then return count
        return await this.productImages.count();
    }

    /**
     * 
     * @returns this method is returning the actual/complete product data/information : header, images, metadata, pricing data
     */
    async getProductInfo(): Promise<Map<string, string | number>> {
        this.map.set('ProductHeader', await this.getProductHeader()); //product header
        this.map.set('ProductImages', await this.getProductImagesCount()); //total number of images
        await this.getProductMetaData(); //product meta data
        await this.getProductPricingData(); //product pricing data
        return this.map;
    }

    // Brand: Apple
    // Product Code: Product 18
    // Reward Points: 800
    // Availability: Out Of Stock
    private async getProductMetaData(): Promise<void> {
        let metData = await this.productMetaData.allInnerTexts();
        for (let data of metData) {
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaVal = meta[1].trim();
            this.map.set(metaKey, metaVal);
        }
    }

    // $2,000.00
    // Ex Tax: $2,000.00
    private async getProductPricingData(): Promise<void> {
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim(); //trim() will remove space
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.map.set('ProductPrice', productPrice); //if key is not available then define your own custom key 'ProductPrice' & value is productPrice
        this.map.set('ExTaxPrice', exTaxPrice);
    }



}