import ProductsModel from "../../../src/models/Products.js"
import { getArrayOfProducts } from "../../fakes/fakesProducts.js"
import { closeTestingServer, userRequest } from "../../helpers/testRequest.js"
import { closeTestingServer, userRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await ProductsModel.deleteMany({})
})

const routePath = "/api/products/length"

describe("Test 'products_length_get' route handler", () => {

    it("Should returns number 0 with status code 200", async () => {
        const response = await userRequest(routePath, "get")
        const response = await userRequest(routePath, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(0)
    })

    it("Should returns number 3 with status code 200", async () => {
        const expectedCount = 3;
        await ProductsModel.insertMany(getArrayOfProducts(expectedCount))
        const response = await userRequest(routePath, "get")
        const response = await userRequest(routePath, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(expectedCount)
    })

    it("Should returns number 8 with status code 200", async () => {
        const expectedCount = 8;
        await ProductsModel.insertMany(getArrayOfProducts(expectedCount))
        const response = await userRequest(routePath, "get")
        const response = await userRequest(routePath, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(expectedCount)
    })

})