import request from "supertest"
import mongoose, { Types } from "mongoose"
import server from "../../../src/server.js"
import ProductsModel from "../../../src/models/Products.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"
import { userAuth, userId } from "../../fakes/testingAuth.js"

afterAll(async () => {
    await mongoose.disconnect()
    server.close()
})

afterEach(async () => {
    await ProductsModel.deleteMany({})
})

const product = getRandomProduct();
const routePath = `/api/products/${product._id}/rating`

describe("Test 'product_addRatingToProduct_post' route handler", () => {

    it("Should returns unauthorized message with status code 401 because authorization token not included", async () => {
        await ProductsModel.create(product)
        const response = await request(server)
            .post(routePath)
            .send({ userId, rate: 5 })

        expect(response.statusCode).toBe(401)
        expect(response.body).toMatchObject({
            message: 'You need some credentials first to access this api'
        })
    })

    it("Should adds the rating (5) and returns `true`", async () => {
        const { _id } = await ProductsModel.create(product)
        const response = await request(server)
            .post(routePath)
            .send({ userId, rate: 5 })
            .set(userAuth())

        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { ratings } = await ProductsModel.findById(_id, { ratings: true })
        expect(ratings[0]).toMatchObject({ raterId: new Types.ObjectId(userId), rating: 5 })
    })

    it("Should adds the rating (3) and returns `true`", async () => {
        const { _id } = await ProductsModel.create(product)
        const response = await request(server)
            .post(routePath)
            .send({ userId, rate: 3 })
            .set(userAuth())

        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { ratings } = await ProductsModel.findById(_id, { ratings: true })
        expect(ratings[0]).toMatchObject({ raterId: new Types.ObjectId(userId), rating: 3 })
    })

})