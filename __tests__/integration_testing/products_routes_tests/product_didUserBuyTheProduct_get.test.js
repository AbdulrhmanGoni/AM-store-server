import { getRandomProduct } from "../../fakes/fakesProducts.js"
import { createFakeOrder } from "../../fakes/fakesOrders.js"
import { fakeUserId } from "../../fakes/testingAuth.js"
import OrdersModel from "../../../src/models/Orders.js"
import { closeTestingServer, userRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await OrdersModel.deleteMany({})
})

const product = getRandomProduct()
const routePath = `/api/products/${product._id}/did-user-buy-the-product`

describe("GET /api/products/:productId/did-user-buy-the-product", () => {
    it("Should returns `true` with status code 200", async () => {
        await OrdersModel.create(createFakeOrder({
            userId: fakeUserId,
            userId: fakeUserId,
            products: [`${product._id}-1-${product.price}-${product.category}`]
        }))

        const response = await userRequest(routePath, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
    })

    it("Should returns `false` with status code 200", async () => {
        await OrdersModel.create(createFakeOrder({
            userId: "66aa8f9ade3704dda49864e7",
            products: [`${product._id}-1-${product.price}-${product.category}`]
        }))

        const response = await userRequest(routePath, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(false)
    })

    it("Should returns `false` with status code 200", async () => {
        const response = await userRequest(routePath, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(false)
    })
})