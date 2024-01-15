import idParser from "../../src/utilities/idParser.js"

describe("Test idParser.js function", () => {
    it("should returns the object { id: 'identifier', count: 3, price: 50, category: 'category' }", () => {
        expect(idParser("identifier-3-50-category"))
            .toEqual({ id: "identifier", count: 3, price: 50, category: "category" })
    })
    it("should returns the object { id: 'identifier', count: 3, price: 50 }", () => {
        expect(idParser("identifier-3-50"))
            .toEqual({ id: "identifier", count: 3, price: 50 })
    })
    it("should returns the object { id: 'identifier', count: 3 }", () => {
        expect(idParser("identifier-3"))
            .toEqual({ id: "identifier", count: 3 })
    })
    it("should returns the object { id: 'identifier' }", () => {
        expect(idParser("identifier"))
            .toEqual({ id: "identifier" })
    })
    it("should returns an empty object { }", () => {
        expect(idParser(""))
            .toEqual({})
    })
})
