import "../../src/configuration/databaseConnections.js"
import { jest } from "@jest/globals"
import { disconnect } from "mongoose"
import eventEmiter from "../../src/utilities/eventEmiter.js"
import { fakeUser } from "../fakes/fakeUsers.js"
import sendNewOrderEvent from "../../src/utilities/sendNewOrderEvent.js"
import { createFakeOrder } from "../fakes/fakesOrders.js"
import { getRandomProduct } from "../fakes/fakesProducts.js"
import UsersModel from "../../src/models/Users.js"
import OrdersModel from "../../src/models/Orders.js"

eventEmiter.emit = jest.fn()

afterAll(async () => {
    eventEmiter.emit.mockReset()
    await UsersModel.deleteMany()
    await OrdersModel.deleteMany()
    await disconnect()
})

describe("Test 'sendNewOrderEvent' function", () => {

    it("Should calls `eventEmiter.emit` function to fire \"new-order\" event and pass the new order to the listeners", async () => {
        const { _id: userId, userEmail, avatar } = await UsersModel.create(fakeUser)
        const newOrder = await OrdersModel.create(createFakeOrder({
            userId,
            products: [`${getRandomProduct()._id}-1-30-panels`]
        }))
        sendNewOrderEvent(newOrder, { userId, userEmail, avatar })
        expect(eventEmiter.emit)
            .toHaveBeenCalledWith(
                "new-order",
                expect.objectContaining({
                    _id: newOrder._id,
                    totalPrice: newOrder.totalPrice,
                    products: newOrder.products,
                    state: newOrder.state,
                    expectedDeliveryDate: newOrder.expectedDeliveryDate,
                    deliveryPrice: newOrder.deliveryPrice,
                    createdAt: newOrder.createdAt,
                    userData: { userId, userEmail, avatar }
                })
            )
    })

})