// import { expect, test } from '@playwright/test';
import { ApiHelper } from '../../src/api/ApiHelper';
import { expect, test } from '../../src/fixtures/apifixtures';

//const TOKEN = process.env.API_Token!;
const AUTH_HEADER = {
        Authorization: `Basic ${Buffer.from('admin:password123').toString('base64')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
 const bookingData = {
        firstname: 'Dhruv',
        lastname: 'Makwana',
        totalprice: 400,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-01-01',
            checkout: '2027-01-01'
        },
        additionalneeds: 'Dinner'
    };

//helper - generic function - create a fresh booking
async function createBooking(apiHelper: ApiHelper) {
        let response = await apiHelper.post('/booking', bookingData, AUTH_HEADER);
        console.log(response);
        expect(response.status).toBe(200);
        return response.body; //give json
}

//Test 1: Create a booking test + verify: AAA
//POST ---> bookingId --> GET /bookingId -- verify
test.skip('POST - create a booking', async ({ apiHelper }) => {

    // Create booking
    let createResponse = await createBooking(apiHelper);

    // Verify status
    let response = await apiHelper.get(`/booking/${createResponse.bookingid}`, AUTH_HEADER);
    console.log(response);
    expect(response.status).toBe(200);

    //Verify booking object
    expect(response.body.firstname).toBe('Dhruv');
    expect(response.body.lastname).toBe('Makwana');
    expect(response.body.totalprice).toBe(400);
    expect(response.body.depositpaid).toBe(true);
    expect(response.body.bookingdates.checkin).toBe('2026-01-01');
    expect(response.body.bookingdates.checkout).toBe('2027-01-01');
    expect(response.body.additionalneeds).toBe('Dinner');
});

//Test 2: Update a user test + verify: AAA
//POST ---> bookingId --> PUT --> GET /bookingId -- verify
test.skip('PUT - update a booking', async ({ apiHelper }) => {
    // Create booking
    let createResponse = await createBooking(apiHelper);
    console.log(createResponse);

    let bookingUpdateData = {
        firstname: 'Yogi',
        lastname: 'Patel',
        totalprice: 400,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-01-01',
            checkout: '2027-01-01'
        },
        additionalneeds: 'Breakfast'
    };

    //update the booking:
    let response = await apiHelper.put(`/booking/${createResponse.bookingid}`, bookingUpdateData, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.firstname).toBe(bookingUpdateData.firstname);
    expect(response.body.lastname).toBe(bookingUpdateData.lastname);

    //get the booking:
    let getResponse = await apiHelper.get(`/booking/${createResponse.bookingid}`, AUTH_HEADER);
    //console.log(getResponse);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.firstname).toBe(bookingUpdateData.firstname);
    expect(getResponse.body.lastname).toBe(bookingUpdateData.lastname);
});

//Test 3: Delete a booking test + verify: AAA
//POST ---> bookingId --> DELETE(204) --> GET /bookingId -- verify(404)
test.skip('DELETE - delete a booking', async ({ apiHelper }) => {
    // Create booking
    let createResponse = await createBooking(apiHelper);
    //console.log(createResponse);

    //Delete booking:
    let response = await apiHelper.delete(`/booking/${createResponse.bookingid}`, AUTH_HEADER);
    expect(response.status).toBe(201);

    //get the booking:
    let getResponse = await apiHelper.get(`/booking/${createResponse.bookingid}`, AUTH_HEADER);
    //console.log(getResponse);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body).toBe('Not Found');
});

// test('get booking test without fixture', async ({ request }) => {
//     const authHeader = {
//         Authorization: `Basic ${Buffer.from('admin:password123').toString('base64')}`
//     };
//     const response = await request.get('https://restful-booker.herokuapp.com/booking/3', { headers: authHeader }
//     );
//     console.log(response);
//     expect(response.status()).toBe(200);
// });

// test('POST - create a booking without fixture', async ({ request }) => {
//     const AUTH_HEADER = {
//         Authorization: `Basic ${Buffer.from('admin:password123').toString('base64')}`,
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     };
//     const bookingData = {
//         firstname: 'Jim',
//         lastname: 'Brown',
//         totalprice: 111,
//         depositpaid: true,
//         bookingdates: {
//             checkin: '2018-01-01',
//             checkout: '2019-01-01'
//         },
//         additionalneeds: 'Breakfast'
//     };

//     // Step 1: Create booking
//     const response = await request.post('https://restful-booker.herokuapp.com/booking', {
//         headers: AUTH_HEADER,
//         data: bookingData
//     });

//     // Step 2: Verify status
//     expect(response.status()).toBe(200);

//     // Step 3: Parse and verify response body
//     const body = await response.json();
//     console.log('Created booking:', body);

//     expect(body.bookingid).toBeDefined();                        // ✅ ID returned
//     expect(body.booking.firstname).toBe('Jim');
//     expect(body.booking.lastname).toBe('Brown');
//     expect(body.booking.totalprice).toBe(111);
//     expect(body.booking.depositpaid).toBe(true);
//     expect(body.booking.bookingdates.checkin).toBe('2018-01-01');
//     expect(body.booking.bookingdates.checkout).toBe('2019-01-01');
//     expect(body.booking.additionalneeds).toBe('Breakfast');
// });