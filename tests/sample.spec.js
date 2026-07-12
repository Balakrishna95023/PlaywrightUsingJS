const {test,expect} = require('@playwright/test')

test("My first test",async function({page}){
    expect(120).toBe(120)
})
test.skip("My second test",async function({page}){
    expect(12).toBe(1)
})
test("My third test",async function({page}){
    expect(1.2).toBe(1.2)
})
test("My fourth test",async function({page}){
    expect("Bala krishna").toContain("krishna")
    expect(true).toBeTruthy()
})
test("My fifth test",async function({page}){
    expect(false).toBeFalsy()
})
test("My sixth test",async function({page}){
    expect("Balakrishna".includes("Bala")).toBeTruthy()
})