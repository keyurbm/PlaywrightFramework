
import { expect, test } from '@playwright/test';

let AUTH_TOKEN = { Authorization: 'Bearer 4de6bd81c8355e44d45e701dfd33b86510cc9f87f4dcc8f59d20c289d155aa1d' };


test('get user test', async ({ request }) => {

    let response = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    });

    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status()); //200
    console.log(response.statusText()); // OK

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");

});

test('create a user test', async ({ request }) => {

    //JS Object
    let userData = {
        name: 'Jack',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };

    //JS Object to JSON: Serialization
    let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    });

    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());//201
    console.log(response.statusText()); //Created

    expect(response.status()).toBe(201);
    expect(response.statusText()).toBe('Created');
});


test('Update a user test', async ({ request }) => {

    //JS Object
    let userData = {
        name: 'Steve jobs',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };

    //JS Object to JSON: Serialization
    let response = await request.put('https://gorest.co.in/public/v2/users/8506553', {
        headers: AUTH_TOKEN,
        data: userData
    });

    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());//200
    console.log(response.statusText()); //OK
});


test('Delete a user test', async ({ request }) => {


    //JS Object to JSON: Serialization
    let response = await request.delete('https://gorest.co.in/public/v2/users/8506576', {
        headers: AUTH_TOKEN,
    });

    console.log(response.status());//204
    console.log(response.statusText()); //No Content
});