import OrdersModel from "../../../src/models/Orders.js"
import { createArrayOfFakeOrders } from "../../fakes/fakesOrders.js"
import { closeTestingServer, userRequest } from "../../helpers/testRequest.js"
import { fakeUserId } from "../../fakes/testingAuth.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await OrdersModel.deleteMany({})
})

const routePath = (orderId) => `/api/orders/${orderId}`;

describe("Test 'orders_getOrderById_get' route handler", () => {

    it("Should returns one order by its id", async () => {
        const [anOrder] = await OrdersModel.insertMany(createArrayOfFakeOrders({ userId: fakeUserId, length: 3 }));
        const response = await userRequest(routePath(anOrder._id), "get", { userId: anOrder.userId });
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            _id: anOrder._id.toString(),
            userId: anOrder.userId.toString(),
            state: "Completed",
            totalPrice: expect.any(Number),
            products: expect.any(Array),
            deliveryPrice: expect.any(Number),
            expectedDeliveryDate: expect.any(String),
            createdAt: expect.any(String)
        })
    })

    it("Should returns null with status code 404", async () => {
        await OrdersModel.insertMany(createArrayOfFakeOrders({ userId: fakeUserId, length: 3 }));
        const response = await userRequest(routePath("6463de6d69180385bb0015fb"), "get");
        expect(response.statusCode).toBe(404);
        expect(response.body).toBeNull();
    })

})