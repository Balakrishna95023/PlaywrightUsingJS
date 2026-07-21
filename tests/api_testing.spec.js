import { test,expect,request } from '@playwright/test';
// const {test,expect} = require('@playwright/test');


test('Get Users API', async ({request}, testInfo)=>
{
    const response = await request.get(
        "https://jsonplaceholder.typicode.com/users"
    );
    // console.log(response);
    expect(response.status()).toBe(200);
    const responsebody = await response.json();
    // console.log(responsebody);
    await testInfo.attach("API response is:", {
        body: JSON.stringify(responsebody,null,2),
        contentType:"application/json"
        }
    )
    expect(responsebody.length).toBeGreaterThan(0);
})

test('Post API usage', async({request},testInfo)=>
{
    const response = await request.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
            data:
            {
                title:'Playwright',
                body:'API testing',
                userId:1,
                name:'Play'
            }
        }
    )
    expect(response.status()).toBe(201);
    const body = await response.json();
    // console.log(body);
    await testInfo.attach("Posted json response is",{
        body: JSON.stringify(response,null,2),
        contentType:"application/json"
    })

})
test('Update user', async({request},testInfo)=>
{
    const response = await request.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data:{
                id:1,
                title: 'Updated title',
                body: 'Updated body',
                userId:1
            }
        }
    )
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toEqual('Updated title')
    await testInfo.attach(
        "Updated Json response is",
        {
            body: JSON.stringify(response,null,2),
        contentType: "application/json"
        }
    )
})
test('Delete record', async({request})=>
{
    const response = await request.delete(
        'https://jsonplaceholder.typicode.com/posts/1'
    )
    expect(response.status()).toBe(200);
})

test.skip('Sending Headers', async({request})=>
{
    const response = await request.get(
        'https://reqres.in/api/users/2',
        {
            headers:{
                'Authorization': 'Bearer token123',
                'Accept': 'application/json'
            }
        }
    )
    expect(response.ok()).toBeTruthy()
})

test('Query Parameters', async({request})=>
{
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/comments?postId=1',
        {
            params:
            {
                postId: 1
            }
        }
    )
    expect(response.status()).toBe(200)
    console.log(await response.json())
})

let apiContext;
test.beforeAll(async()=>{
    apiContext = await request.newContext({
        baseURL:'https://jsonplaceholder.typicode.com',
        extraHTTPHeaders:{
            Authorization:'Bearer token'
        }
    })
})
test('Get Users', async()=>{
    const response =await apiContext.get('/users')
    expect(response.status()).toBe(200)
})

test.afterAll(async()=>
{
    await apiContext.dispose();
})

test('Validate response fields', async({request})=>
{
    const response = await apiContext.get(
        'https://jsonplaceholder.typicode.com/users/1'
    )
    const body = await response.json()
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('email');
})