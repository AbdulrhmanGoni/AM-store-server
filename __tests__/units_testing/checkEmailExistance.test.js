import { jest } from "@jest/globals";
import checkEmailExistance from "../../src/utilities/checkEmailExistance.js";

global.fetch = jest.fn()

afterAll(() => {
    global.fetch.mockReset()
})

describe("Test `checkEmailExistance` function that checks if the given email valid and active", () => {

    it("Should returns `true` for 'abdulrhmangoni@gmail.com' email", async () => {
        const emailToTest = "abdulrhmangoni@gmail.com"
        global.fetch.mockResolvedValue({ json: () => ({ data: { status: "valid" } }) })
        const respond = await checkEmailExistance(emailToTest)
        expect(global.fetch).toHaveBeenLastCalledWith(expect.stringMatching(emailToTest));
        expect(respond).toBe(true)
    })

    it("Should returns `false` for 'abdulrhmangoni@ddsmails.moc' email", async () => {
        const emailToTest = "abdulrhmangoni@ddsmails.moc"
        global.fetch.mockResolvedValue({ json: () => ({ data: { status: "invalid" } }) })
        const respond = await checkEmailExistance(emailToTest)
        expect(global.fetch).toHaveBeenLastCalledWith(expect.stringMatching(emailToTest));
        expect(respond).toBe(false)
    })

    it("Should returns `false` for 'nsyu.nmumtucu6.8586.8685nghc@gmail.com' email", async () => {
        const emailToTest = "nsyu.nmumtucu6.8586.8685nghc@gmail.com"
        global.fetch.mockRejectedValue()
        const respond = await checkEmailExistance(emailToTest)
        expect(global.fetch).toHaveBeenLastCalledWith(expect.stringMatching(emailToTest));
        expect(respond).toBe(false)
    })

})