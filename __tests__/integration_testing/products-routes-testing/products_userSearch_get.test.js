import request from "supertest"
import mongoose from "mongoose"
import server from "../../../src/server.js"
import ProductsModel from "../../../src/models/Products.js"
import { getArrayOfProducts } from "../../fakes/fakesProducts.js"

beforeAll(async () => {
    await ProductsModel.insertMany(getArrayOfProducts())
})

afterAll(async () => {
    await ProductsModel.deleteMany({})
    await mongoose.disconnect()
    server.close()
})

const routePath = "/api/products"

describe("Test 'products_userSearch_get' route handler", () => {

    it("Should returns an array of products with titles match 'l'", async () => {
        const response = await request(server).get(`${routePath}?title=l`)
        expect(response.statusCode).toBe(200)
        response.body.forEach(product => {
            expect(product.title).toMatch(/l/i)
        });
    })

    it("Should returns an array of figures products", async () => {
        const response = await request(server).get(`${routePath}?category=figures`)
        expect(response.statusCode).toBe(200)
        response.body.forEach(product => {
            expect(product.category).toBe("figures")
        });
    })

    it("Should returns an array of Attack On Titan series products", async () => {
        const response = await request(server).get(`${routePath}?series=Attack On Titan`)
        expect(response.statusCode).toBe(200)
        response.body.forEach(product => {
            expect(product.series).toBe("Attack On Titan")
        });
    })

    it("Should returns an array of figurs products with titles match 'naruto'", async () => {
        const response = await request(server).get(`${routePath}?title=naruto`)
        expect(response.statusCode).toBe(200)
        response.body.forEach(product => {
            expect(product.title).toMatch(/naruto/i)
        });
    })

    it("Should returns an empty array with status code 404", async () => {
        const response = await request(server).get(`${routePath}?title=luffy&category=soccer`)
        expect(response.statusCode).toBe(404)
        expect(response.body.length).toBe(0)
    })

    it("Should returns an empty array with status code 404", async () => {
        const response = await request(server).get(`${routePath}?title=ftnjgdjtmd`)
        expect(response.statusCode).toBe(404)
        expect(response.body.length).toBe(0)
    })

})