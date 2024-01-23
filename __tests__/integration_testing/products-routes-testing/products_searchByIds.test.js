import request from "supertest"
import mongoose from "mongoose"
import server from "../../../src/server.js"
import ProductsModel from "../../../src/models/Products.js"
import { getArrayOfProducts } from "../../fakes/fakesProducts.js"

const products = getArrayOfProducts()

afterAll(async () => {
    await ProductsModel.deleteMany({});
    await mongoose.disconnect()
    server.close()
})

beforeAll(async () => {
    await ProductsModel.insertMany(products);
})

const routePath = "/api/products"

describe("Test 'products_searchByIds' route handler", () => {

    it("Should returns an array of products", async () => {
        const productsIds = products.slice(0, 5)
            .map(({ _id, price }, i) => `${_id}-${i + 1}-${price}`)

        const response = await request(server)
            .post(routePath)
            .send({ productsIds })

        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(productsIds.length)
        productsIds.forEach((id) => {
            expect(response.body).toEqual(
                expect.arrayContaining([expect.objectContaining({ _id: id.slice(0, 24) })])
            )
        })
    })

    it("Should returns an array of products included their counts in `productsIds`", async () => {
        const productsIds = products.slice(0, 3)
            .map(({ _id, price }, i) => `${_id}-${i + 1}-${price}`)

        const response = await request(server)
            .post(routePath)
            .send({ productsIds, withCount: true })

        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(productsIds.length)
        productsIds.forEach((id) => {
            const [_id, count] = id.split("-")
            expect(response.body).toEqual(
                expect.arrayContaining([expect.objectContaining({ _id, count: +count })])
            )
        })
    })

    it("Should returns an array of products included their prices in `productsIds`", async () => {
        const productsIds = products.slice(0, 3)
            .map(({ _id, price }, i) => `${_id}-${i + 1}-${price * .1}`)

        const response = await request(server)
            .post(routePath)
            .send({ productsIds, withPrice: true })

        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(productsIds.length)
        productsIds.forEach((id) => {
            const [_id, , price] = id.split("-")
            expect(response.body).toEqual(
                expect.arrayContaining([expect.objectContaining({ _id, price: +price })])
            )
        })
    })

    it("Should returns an array of products included their counts in `productsIds`", async () => {
        const productsIds = products.slice(0, 3)
            .map(({ _id, price }, i) => `${_id}-${i + 1}-${price * .1}`)

        const response = await request(server)
            .post(routePath)
            .send({ productsIds, withCount: true, withPrice: true })

        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(productsIds.length)
        productsIds.forEach((id) => {
            const [_id, count, price] = id.split("-")
            expect(response.body).toEqual(
                expect.arrayContaining([expect.objectContaining({ _id, price: +price, count: +count })])
            )
        })
    })

})