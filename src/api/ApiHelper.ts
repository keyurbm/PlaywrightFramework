import { APIRequestContext } from "@playwright/test";

export class ApiHelper {

    //class level variables
    private readonly request: APIRequestContext;
    private readonly baseURL: string;

    //initialize a variables with the help of constructor
    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }
    
    //GET (number of await steps we have define that's the reason method is define as async)
    //purpose of this method is call the get api & give me response
    //header is optional parameter define as ?
    async get(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.get(
            `${this.baseURL}${endPoint}`, 
            {
                headers: headers
            }
        );
        
    //To handle non-JSON responses    
    if (!response.ok()) {
        return {
            status: response.status(),
            body: await response.text()   
        };
    }
     
        //console.log('API GET response: ', response);
        //return object in key value pair
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //POST
    async post(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.post(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });
        return {
            status: response.status(),
            body: await response.json()
        }
    }


    //PUT
    async put(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.put(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //Delete
    async delete(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
            headers: headers
        });
        return {
            status: response.status()
        }
    }

}