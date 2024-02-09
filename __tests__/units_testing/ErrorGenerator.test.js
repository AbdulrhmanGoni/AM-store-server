import ErrorGenerator from "../../src/utilities/ErrorGenerator.js"

describe("Test 'ErrorGenerator' class", () => {
    it("Should throws an error with \"Testing Error\" message and 400 status code", async () => {
        const error = new ErrorGenerator("Testing Error", 400);
        expect(error).toMatchObject({
            message: "Testing Error",
            statusCode: 400,
            status: "Fail"
        })
        expect(() => { throw error }).toThrow()
    })
})