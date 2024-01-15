import genRandomNumber from "../../src/utilities/genRandomNumber.js"

test("it should returns a number of n digits", () => {
    const randomNumber = genRandomNumber(4)
    expect(randomNumber).toBeGreaterThan(999)
    expect(randomNumber).toBeLessThan(10000)
})