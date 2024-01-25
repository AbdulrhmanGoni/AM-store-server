import request from "supertest"
import mongoose from "mongoose"
import server from "../../../src/server.js"
import ProductsModel from "../../../src/models/Products.js"
import { getArrayOfProducts } from "../../fakes/fakesProducts.js"

afterAll(async () => {
    await mongoose.disconnect()
    server.close()
})

afterEach(async () => {
    await ProductsModel.deleteMany({})
})

const routePath = "/api/products/length"

describe("Test 'products_length_get' route handler", () => {

    it("Should returns number 0 with status code 200", async () => {
        const response = await request(server).get(routePath)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(0)
    })

    it("Should returns number 3 with status code 200", async () => {
        const expectedCount = 3;
        await ProductsModel.insertMany(getArrayOfProducts(expectedCount))
        const response = await request(server).get(routePath)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(expectedCount)
    })

    it("Should returns number 8 with status code 200", async () => {
        const expectedCount = 8;
        await ProductsModel.insertMany(getArrayOfProducts(expectedCount))
        const response = await request(server).get(routePath)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(expectedCount)
    })

})