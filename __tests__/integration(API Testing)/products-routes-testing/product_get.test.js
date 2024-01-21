import request from "supertest"
import mongoose from "mongoose"
import server from "../../../src/server.js"

afterAll(async () => {
    await mongoose.disconnect()
    server.close()
})

const routePath = "/api/products"

describe("Test 'product_get' route handler", () => {

    it("Should returns null with status code 404", async () => {
        const randomId = "65ac120ee8acb26ee9dcd95b"
        const response = await request(server).get(`${routePath}/${randomId}`)
        expect(response.statusCode).toBe(404)
        expect(response.body).toBe(null)
    })

})