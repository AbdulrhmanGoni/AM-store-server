import request from "supertest"
import mongoose from "mongoose"
import server from "../../../src/server.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"
import { createFakeOrder } from "../../fakes/fakesOrders.js"
import { userAuth, userId } from "../../fakes/testingAuth.js"
import OrdersModel from "../../../src/models/Orders.js"


afterAll(async () => {
    await mongoose.disconnect()
    server.close()
})

afterEach(async () => {
    await OrdersModel.deleteMany({})
})

const product = getRandomProduct()
const routePath = `/api/products/${product._id}/are-user-bought-the-product-before`

describe("Test 'product_areUserBoughtAProductsBefore_get' route handler", () => {
    it("Should returns `true` with status code 200", async () => {
        await OrdersModel.create(createFakeOrder({
            userId,
            products: [`${product._id}-1-${product.price}-${product.category}`]
        }))

        const response = await request(server)
            .get(routePath)
            .set(userAuth())

        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
    })

    it("Should returns `false` with status code 200", async () => {
        await OrdersModel.create(createFakeOrder({
            userId: "66aa8f9ade3704dda49864e7",
            products: [`${product._id}-1-${product.price}-${product.category}`]
        }))
        const response = await request(server)
            .get(routePath)
            .set(userAuth())

        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(false)
    })

    it("Should returns `false` with status code 200", async () => {
        const response = await request(server).get(routePath)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(false)
    })
})