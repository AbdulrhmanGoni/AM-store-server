import { closeTestingServer, userRequest, createEventSource } from "../../helpers/testRequest.js"
import OrdersModel from "../../../src/models/Orders.js"
import { createArrayOfFakeOrders, createFakeOrder } from "../../fakes/fakesOrders.js"
import { fakeUser } from "../../fakes/fakeUsers.js"
import { fakeUserId } from '../../fakes/testingAuth.js';
import sendNewOrderEvent from '../../../src/utilities/sendNewOrderEvent.js';
import waitFor from "../../helpers/waitFor.js";

afterAll(async () => {
    await OrdersModel.deleteMany({})
    await closeTestingServer()
})

const routePath = `/api/orders/watch-new-orders`;

describe("Test 'orders_watchNewOrders_get' route handler", () => {

    it('Should returns the added order immediately through `eventSource.onmessage` event', async () => {
        const eventSource = createEventSource(routePath);
        eventSource.onmessage = (event) => {
            expect(JSON.parse(event.data)).toMatchObject({
                _id: expect.any(String),
                totalPrice: expect.any(Number),
                products: expect.any(Array),
                state: expect.any(String),
                expectedDeliveryDate: expect.any(String),
                deliveryPrice: expect.any(Number),
                createdAt: expect.any(String),
                userData: {
                    userId: expect.any(String),
                    userEmail: expect.any(String),
                    avatar: expect.any(String)
                }
            });
        };

        eventSource.onerror = (error) => { throw error };

        await OrdersModel.create(createFakeOrder({ userId: fakeUserId }))
            .then((order) => {
                const userData = {
                    userId: fakeUserId,
                    userEmail: fakeUser.userEmail,
                    avatar: fakeUser.avatar
                }
                sendNewOrderEvent(order, userData)
            })

        await waitFor(2.5, () => { eventSource.close() })

    });

    it("Should returns an error with status code 401 and \"You are not admin\" message", async () => {
        await OrdersModel.insertMany(createArrayOfFakeOrders({ userId: fakeUserId }));
        const response = await userRequest(routePath, "get");
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toMatch("You are not admin");
    })

});
