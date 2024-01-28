import ProductsModel from "../../../src/models/Products.js"
import { getArrayOfProducts } from "../../fakes/fakesProducts.js"
import { anyRequest, closeTestingServer } from "../../helpers/testRequest.js"

beforeAll(async () => {
    await ProductsModel.insertMany(getArrayOfProducts())
})

afterAll(async () => {
    await ProductsModel.deleteMany({})
    await closeTestingServer()
})

const routePath = "/api/products"

describe("Test 'products_userSearch_get' route handler", () => {

    it("Should returns an array of products with titles match 'l'", async () => {
        const response = await anyRequest(`${routePath}?title=l`, "get")
        expect(response.statusCode).toBe(200)
        response.body.forEach(product => {
            expect(product.title).toMatch(/l/i)
        });
    })

    it("Should returns an array of figures products", async () => {
        const response = await anyRequest(`${routePath}?category=figures`, "get")
        expect(response.statusCode).toBe(200)
        response.body.forEach(product => {
            expect(product.category).toBe("figures")
        });
    })

    it("Should returns an array of Attack On Titan series products", async () => {
        const response = await anyRequest(`${routePath}?series=Attack On Titan`, "get")
        expect(response.statusCode).toBe(200)
        response.body.forEach(product => {
            expect(product.series).toBe("Attack On Titan")
        });
    })

    it("Should returns an array of figurs products with titles match 'naruto'", async () => {
        const response = await anyRequest(`${routePath}?title=naruto`, "get")
        expect(response.statusCode).toBe(200)
        response.body.forEach(product => {
            expect(product.title).toMatch(/naruto/i)
        });
    })

    it("Should returns an empty array with status code 404", async () => {
        const response = await anyRequest(`${routePath}?title=luffy&category=soccer`, "get")
        expect(response.statusCode).toBe(404)
        expect(response.body.length).toBe(0)
    })

    it("Should returns an empty array with status code 404", async () => {
        const response = await anyRequest(`${routePath}?title=ftnjgdjtmd`, "get")
        expect(response.statusCode).toBe(404)
        expect(response.body.length).toBe(0)
    })

})