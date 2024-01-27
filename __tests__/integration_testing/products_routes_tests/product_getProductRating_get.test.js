import request from "supertest"
import mongoose from "mongoose"
import server from "../../../src/server.js"
import ProductsModel from "../../../src/models/Products.js"
import { getArrayOfProducts } from "../../fakes/fakesProducts.js"
import { closeTestingServer, userRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await ProductsModel.deleteMany({})
    await closeTestingServer()
})

const routePath = (id) => `/api/products/${id}/rating`

describe("Test 'product_getProductRating_get' route handler", () => {

    const products = getArrayOfProducts(4)

    it("Should returns products's rating object status code 200", async () => {
        const product = products[0]
        product.ratings = [
            { raterId: "6442ea0558a819df70390175", rating: 5 },
            { raterId: "64440dec163292936d0f94a7", rating: 5 },
            { raterId: "6456b6b1274b16a9f2f2b529", rating: 5 }
        ]
        const { _id } = await ProductsModel.create(product)
        const response = await userRequest(routePath(_id), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            reviews: 3,
            oneStar: { count: 0, percentage: 0 },
            twoStars: { count: 0, percentage: 0 },
            threeStars: { count: 0, percentage: 0 },
            fuorStars: { count: 0, percentage: 0 },
            fiveStars: { count: 3, percentage: 100 },
            currentUserRating: 0,
            ratingAverage: 5
        })
    })

    it("Should returns products's rating object status code 200", async () => {
        const product = products[1]
        product.ratings = [
            { raterId: "6442ea0558a819df70390175", rating: 4 },
            { raterId: "64440dec163292936d0f94a7", rating: 5 },
            { raterId: "6456b6b1274b16a9f2f2b529", rating: 2 },
            { raterId: "6466b6b1874b16a9f2f2b529", rating: 5 },
            { raterId: "6446b6b1274b16a9e2f2b555", rating: 3 }
        ]
        const { _id } = await ProductsModel.create(product)
        const response = await userRequest(routePath(_id), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            reviews: 5,
            oneStar: { count: 0, percentage: 0 },
            twoStars: { count: 1, percentage: 20 },
            threeStars: { count: 1, percentage: 20 },
            fuorStars: { count: 1, percentage: 20 },
            fiveStars: { count: 2, percentage: 40 },
            currentUserRating: 0,
            ratingAverage: 3.7
        })
    })

    it("Should returns products's rating object status code 200", async () => {
        const product = products[2]
        product.ratings = [
            { raterId: "6442ea0558a819df70390175", rating: 3 },
            { raterId: "64440dec163292936d0f94a7", rating: 2 }
        ]
        const { _id } = await ProductsModel.create(product)
        const response = await userRequest(routePath(_id), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            reviews: 2,
            oneStar: { count: 0, percentage: 0 },
            twoStars: { count: 1, percentage: 50 },
            threeStars: { count: 1, percentage: 50 },
            fuorStars: { count: 0, percentage: 0 },
            fiveStars: { count: 0, percentage: 0 },
            currentUserRating: 0,
            ratingAverage: 2.5
        })
    })

    it("Should returns products's rating object status code 200", async () => {
        const product = products[3]
        const { _id } = await ProductsModel.create(product)
        const response = await userRequest(routePath(_id), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            reviews: 0,
            oneStar: { count: 0, percentage: 0 },
            twoStars: { count: 0, percentage: 0 },
            threeStars: { count: 0, percentage: 0 },
            fuorStars: { count: 0, percentage: 0 },
            fiveStars: { count: 0, percentage: 0 },
            currentUserRating: 0,
            ratingAverage: 0
        })
    })

})