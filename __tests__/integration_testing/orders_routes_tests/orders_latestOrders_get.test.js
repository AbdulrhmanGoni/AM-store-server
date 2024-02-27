import OrdersModel from "../../../src/models/Orders.js"
import { createArrayOfFakeOrders } from "../../fakes/fakesOrders.js"
import { closeTestingServer, adminRequest, userRequest } from "../../helpers/testRequest.js"
import { fakeUserId } from "../../fakes/testingAuth.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await OrdersModel.deleteMany({})
})

const routePath = (limit) => `/api/orders/latest-orders?limit=${limit}`;

describe("GET /api/orders/latest-orders?limit", () => {

    it("Should returns an array of last 3 orders", async () => {
        await OrdersModel.insertMany(createArrayOfFakeOrders({ userId: fakeUserId }));
        const response = await adminRequest(routePath(3), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(3);
        response.body.forEach((order) => {
            expect(order).toMatchObject({
                _id: expect.any(String),
                state: "Completed",
                totalPrice: expect.any(Number),
                products: expect.any(Array),
                deliveryPrice: expect.any(Number),
                expectedDeliveryDate: expect.any(String),
                createdAt: expect.any(String),
            })
        })
    })

    it("Should returns error with status code 401 and \"You are not admin\" message", async () => {
        await OrdersModel.insertMany(createArrayOfFakeOrders({ userId: fakeUserId }));
        const response = await userRequest(routePath(3), "get");
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toMatch("You are not admin");
    })

})