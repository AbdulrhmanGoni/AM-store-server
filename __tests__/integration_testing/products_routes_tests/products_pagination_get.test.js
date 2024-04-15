import { getArrayOfProducts } from "../../fakes/fakesProducts.js"
import ProductsModel from "../../../src/models/Products.js"
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"

afterAll(async () => {
    await ProductsModel.deleteMany({})
    await closeTestingServer()
})

beforeAll(async () => {
    // add an array of 8 products
    await ProductsModel.insertMany(getArrayOfProducts())
})

const routePath = (page, pageSize, returnType = "", categoriesFilter = "") =>
    `/api/products/pagination?page=${page}&pageSize=${pageSize}&returnType=${returnType}&categories=${categoriesFilter}`

describe("GET /api/products/pagination?page&pageSize&returnType", () => {

    it("Should returns an array of four products", async () => {
        const page = 1, pageSize = 4
        const response = await adminRequest(routePath(page, pageSize), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.products.length).toBe(pageSize)
        expect(response.body.products).toEqual(
            expect.arrayContaining([expect.objectContaining({
                _id: expect.any(String),
                title: expect.any(String),
                price: expect.any(Number)
            })])
        )
    })

    it("Should returns an empty array", async () => {
        const page = 5, pageSize = 10
        const response = await adminRequest(routePath(page, pageSize), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.products.length).toBe(0)
    })

    it("Should returns an array of two products", async () => {
        const page = 2, pageSize = 3
        const response = await adminRequest(routePath(page, pageSize), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.products.length).toBe(pageSize)
        expect(response.body.products).toEqual(
            expect.arrayContaining([expect.objectContaining({
                _id: expect.any(String),
                title: expect.any(String),
                price: expect.any(Number),
                images: [expect.any(String)],
                category: expect.any(String),
                series: expect.any(String),
                description: expect.any(String),
                description: expect.any(String)
            })])
        )
    })

    it("Should returns an array of eight products with only `_id` and `title` properties", async () => {
        const page = 1, pageSize = 8, returnType = "title"
        const response = await adminRequest(routePath(page, pageSize, returnType), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.products.length).toBe(pageSize)
        response.body.products.forEach((product) => {
            expect(Object.keys(product)).toHaveLength(2)
            expect(product).toMatchObject({
                _id: expect.any(String),
                title: expect.any(String)
            })
        })
    })

    it("Should returns an array of five products with 4 properties `_id`, `title`, `price` and `series`", async () => {
        const page = 1, pageSize = 5, returnType = "title,price,series"
        const response = await adminRequest(routePath(page, pageSize, returnType), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.products.length).toBe(pageSize)
        response.body.products.forEach((product) => {
            expect(Object.keys(product)).toHaveLength(4)
            expect(product).toMatchObject({
                _id: expect.any(String),
                title: expect.any(String),
                price: expect.any(Number),
                series: expect.any(String)
            })
        })
    })

    it("Should returns an array of one product with only id and images array", async () => {
        const page = 2, pageSize = 7, returnType = "images"
        const response = await adminRequest(routePath(page, pageSize, returnType), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.products.length).toBe(1)
        expect(Object.keys(response.body.products[0])).toHaveLength(2)
        expect(response.body.products[0]).toMatchObject({
            _id: expect.any(String),
            images: [expect.any(String)]
        })
    })

    it("Should returns an array of products with only `panels` categories", async () => {
        const page = 1, pageSize = 5, category = "panels"
        const response = await adminRequest(routePath(page, pageSize, undefined, category), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.products.every((product) => product.category === category)).toBe(true)
    })

    it("Should returns an array of products with only `figures` categories", async () => {
        const page = 1, pageSize = 5, category = "figures"
        const response = await adminRequest(routePath(page, pageSize, undefined, category), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.products.every((product) => product.category === category)).toBe(true)
    })

})