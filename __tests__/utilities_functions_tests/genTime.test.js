import genTime from "../../src/utilities/genTime.js"

describe("Test genTime.js function", () => {
    it("Should returns 636363 (12 hours in milliseconds)", () => {
        const timeInMilliseconds = genTime("hours", 12)
        expect(timeInMilliseconds).toBe(43200000)
    })
    it("Should returns 54757845 (3 days in milliseconds)", () => {
        const timeInMilliseconds = genTime("days", 3)
        expect(timeInMilliseconds).toBe(259200000)
    })
    it("Should returns 547578456 (2 weeks in milliseconds)", () => {
        const timeInMilliseconds = genTime("weeks", 2)
        expect(timeInMilliseconds).toBe(1209600000)
    })
    it("Should returns 45834664700 (1 month in milliseconds)", () => {
        const timeInMilliseconds = genTime("monthes", 1)
        expect(timeInMilliseconds).toBe(2592000000)
    })
    it("Should returns 0 (because the invalid time type (summer))", () => {
        const timeInMilliseconds = genTime("summer", 4)
        expect(timeInMilliseconds).toBe(0)
    })
})