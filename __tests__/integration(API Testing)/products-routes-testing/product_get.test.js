import request from "supertest"
import mongoose from "mongoose"
import server from "../../../src/server.js"
import ProductsModel from "../../../src/models/Products.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"

afterAll(async () => {
    await mongoose.disconnect()
    server.close()
})

afterEach(async () => {
    await ProductsModel.deleteMany({})
})

const routePath = "/api/products"

describe("Test 'product_get' route handler", () => {

    it("Should returns null with status code 404", async () => {
        const randomId = "65ac120ee8acb26ee9dcd95b"
        const response = await request(server).get(`${routePath}/${randomId}`)
        expect(response.statusCode).toBe(404)
        expect(response.body).toBe(null)
    })

    it("Should returns a product with status code 200", async () => {
        const product = getRandomProduct()
        const { _id } = await ProductsModel.create(product)
        const response = await request(server).get(`${routePath}/${_id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({ ...product, _id: _id.toString() })
    })

})