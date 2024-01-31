import OrdersModel from "../../../src/models/Orders.js"
import { createArrayOfFakeOrders } from "../../fakes/fakesOrders.js"
import { userRequest, closeTestingServer } from "../../helpers/testRequest.js"
import { fakeUserId } from "../../fakes/testingAuth.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await OrdersModel.deleteMany({})
})

const routePath = (sliceNumber, sliceSize) => `/api/orders/users?sliceNumber=${sliceNumber}&sliceSize=${sliceSize}`

describe("Test 'orders_getUserOrders_get' route handler", () => {

    it("Should returns an array of 4 orders", async () => {
        await OrdersModel.insertMany(createArrayOfFakeOrders({ userId: fakeUserId }));
        const response = await userRequest(routePath(1, 4), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.orders.length).toBe(4);
        expect(response.body.thereIsMore).toBe(true);
        response.body.orders.forEach((order) => {
            expect(order).toHaveProperty("userId", fakeUserId)
        })
    })

    it("Should returns an array of 10 orders", async () => {
        await OrdersModel.insertMany(createArrayOfFakeOrders({ userId: fakeUserId, length: 10 }));
        const response = await userRequest(routePath(1, 10), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.orders.length).toBe(10);
        expect(response.body.thereIsMore).toBe(false);
        response.body.orders.forEach((order) => {
            expect(order).toHaveProperty("userId", fakeUserId)
        })
    })

})