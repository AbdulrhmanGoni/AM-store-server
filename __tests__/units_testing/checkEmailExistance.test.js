import checkEmailExistance from "../../src/utilities/checkEmailExistance.js"

describe("Test `checkEmailExistance` function that checks if the given email valid and active", () => {

    it("Should returns `true` for 'abdulrhmangoni@gmail.com' email", async () => {
        const respond = await checkEmailExistance("abdulrhmangoni@gmail.com")
        expect(respond).toBe(true)
    })

    it("Should returns `false` for 'nsyu.nmumtucu6.8586.8685nghc@gmail.com' email", async () => {
        const respond = await checkEmailExistance(".nsyu.nmumtucu6.8586.8685ngh..c@gmail.com")
        expect(respond).toBe(false)
    })

    it("Should returns `false` for 'abdulrhmangoni@ddsmails.moc' email", async () => {
        const respond = await checkEmailExistance("abdulrhmangoni@ddsmails.com")
        expect(respond).toBe(false)
    })

})