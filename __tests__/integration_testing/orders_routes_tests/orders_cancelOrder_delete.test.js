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

const routePath = (orderId) => `/api/orders/${orderId}?type=cancel`;

describe("Test 'orders_cancelOrder_delete' route handler", () => {

    it("Should returns one order by its id", async () => {
        const [anOrder] = await OrdersModel.insertMany(createArrayOfFakeOrders({ userId: fakeUserId, length: 3 }));
        const response = await userRequest(routePath(anOrder._id), "delete", { userId: fakeUserId });
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        const canceledOrder = await OrdersModel.findById(anOrder._id, { state: 1, expectedDeliveryDate: 1 });
        expect(canceledOrder).toMatchObject({
            state: "Canceled",
            expectedDeliveryDate: "Canceled"
        })
    })

})