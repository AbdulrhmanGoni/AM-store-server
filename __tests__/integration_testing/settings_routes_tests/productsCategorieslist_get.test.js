import { userRequest, closeTestingServer } from "../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

const routePath = "/api/settings/variables"

describe("Test 'productsCategorieslist_get' route handler", () => {

    it("Should returns an array of products categories", async () => {
        const response = await userRequest(routePath, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.categoriesList).toEqual(
            expect.arrayContaining([expect.any(String)])
        )
    })

})