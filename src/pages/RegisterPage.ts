import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class RegisterPage extends BasePage {

    //private Locators: 
    private readonly firstname: Locator;
    private readonly lastname: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly passwordconfirm: Locator;
    private readonly subscribe: Locator;
    private readonly agree: Locator;
    private readonly continue: Locator;
    private readonly headers: Locator;

    //const... of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.firstname = page.getByRole('textbox', { name: 'First Name' });
        this.lastname = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephone = page.getByRole('textbox', { name: 'Telephone' });
        //this.password = page.getByRole('textbox', { name: 'Password'});
        this.password = page.locator('#input-password');
        this.passwordconfirm = page.getByRole('textbox', { name: 'Password Confirm' });
        this.subscribe = page.getByRole('radio', { name: 'Yes' });
        this.agree = page.locator('[name="agree"]');
        this.continue = page.getByRole('button', { name: 'Continue' });
        this.headers = page.locator('#content h1');
    };

    //public page actions(methods)/behaviour
    async goToRegisterPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/register');
    }

    async getRegisterPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async doRegister(firstname: string, lastname: string, email: string, telephone: string, password: string, passwordconfirm: string): Promise<void> {
             
        console.log(`register details: ${firstname} - ${lastname} - ${email} - ${telephone}`);
        await this.firstname.fill(firstname);
        await this.lastname.fill(lastname);
        await this.email.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.passwordconfirm.fill(passwordconfirm);
        await this.subscribe.check();
        await this.agree.check();
        await this.continue.click();
    }

     async isSuccessMsgDisplayed(): Promise<boolean> {
        return await this.headers.isVisible();
    }
}



