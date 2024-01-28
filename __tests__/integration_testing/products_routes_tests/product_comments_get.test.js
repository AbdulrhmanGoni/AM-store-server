import ProductsCommentsModel from "../../../src/models/ProductsComments.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"
import comments from "../../fakes/fakeProductComments.js"
import { closeTestingServer, anyRequest } from "../../helpers/testRequest.js"
import { closeTestingServer, anyRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await ProductsCommentsModel.deleteMany({});
    await closeTestingServer()
})

const product = getRandomProduct();

beforeAll(async () => {
    // Add an array of nine comments for the product
    await ProductsCommentsModel.insertMany([{ productId: product._id, comments }]);
})

const routePath = (id, sliceNumber, sliceSize) =>
    `/api/products/${id}/comments?sliceNumber=${sliceNumber}&sliceSize=${sliceSize}`

describe("Test 'product_comments_get.test' route handler", () => {

    it("Should returns an array of three comments with `thereIsMore: true`", async () => {
        const sliceNumber = 1
        const sliceSize = 3
        const response = await anyRequest(routePath(product._id, sliceNumber, sliceSize), "get")
        const response = await anyRequest(routePath(product._id, sliceNumber, sliceSize), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.thereIsMore).toBe(true)
        expect(response.body.comments.length).toBe(sliceSize)
        expect(response.body.comments).toEqual(
            expect.arrayContaining([expect.objectContaining({ text: expect.any(String) })])
        )
    })

    it("Should returns an array of nine comments with `thereIsMore: false`", async () => {
        const sliceNumber = 1
        const sliceSize = 15
        const response = await anyRequest(routePath(product._id, sliceNumber, sliceSize), "get")
        const response = await anyRequest(routePath(product._id, sliceNumber, sliceSize), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.thereIsMore).toBe(false)
        expect(response.body.comments.length).toBe(9)
        expect(response.body.comments).toEqual(
            expect.arrayContaining([expect.objectContaining({ text: expect.any(String) })])
        )
    })

    it("Should returns an array of three comments with `thereIsMore: false`", async () => {
        const sliceNumber = 3
        const sliceSize = 3
        const response = await anyRequest(routePath(product._id, sliceNumber, sliceSize), "get")
        const response = await anyRequest(routePath(product._id, sliceNumber, sliceSize), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.thereIsMore).toBe(false)
        expect(response.body.comments.length).toBe(sliceSize)
        expect(response.body.comments).toEqual(
            expect.arrayContaining([expect.objectContaining({ text: expect.any(String) })])
        )
    })

    it("Should returns an array of two comments with `thereIsMore: false`", async () => {
        const sliceNumber = 2
        const sliceSize = 7
        const response = await anyRequest(routePath(product._id, sliceNumber, sliceSize), "get")
        const response = await anyRequest(routePath(product._id, sliceNumber, sliceSize), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.thereIsMore).toBe(false)
        expect(response.body.comments.length).toBe(2)
        expect(response.body.comments).toEqual(
            expect.arrayContaining([expect.objectContaining({ text: expect.any(String) })])
        )
    })

    it("Should returns an array of four comments with `thereIsMore: true`", async () => {
        const sliceNumber = 2
        const sliceSize = 4
        const response = await anyRequest(routePath(product._id, sliceNumber, sliceSize), "get")
        const response = await anyRequest(routePath(product._id, sliceNumber, sliceSize), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.thereIsMore).toBe(true)
        expect(response.body.comments.length).toBe(4)
        expect(response.body.comments).toEqual(
            expect.arrayContaining([expect.objectContaining({ text: expect.any(String) })])
        )
    })

    it("Should returns an ampty comments array with `thereIsMore: false`", async () => {
        const sliceNumber = 3
        const sliceSize = 5
        const response = await anyRequest(routePath(product._id, sliceNumber, sliceSize), "get")
        const response = await anyRequest(routePath(product._id, sliceNumber, sliceSize), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.thereIsMore).toBe(false)
        expect(response.body.comments.length).toBe(0)
    })

    it("Should returns an ampty comments array with `thereIsMore: false`", async () => {
        await ProductsCommentsModel.deleteMany({});
        const response = await anyRequest(routePath(product._id, 1, 1), "get")
        const response = await anyRequest(routePath(product._id, 1, 1), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.thereIsMore).toBe(false)
        expect(response.body.comments.length).toBe(0)
    })

})
