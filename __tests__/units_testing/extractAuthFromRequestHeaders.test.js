import extractAuthFromRequestHeaders from "../../src/utilities/extractAuthFromRequestHeaders.js"

test("it should returns an object with 'accessToken' key", () => {
    const requestObject = { headers: { authorization: "Bearer seeeeeeeeeeeee" } }
    expect(extractAuthFromRequestHeaders(requestObject))
        .toEqual({ accessToken: "seeeeeeeeeeeee" })
})
