import OrdersModel from "../../../src/models/Orders.js"
import { createFakeOrder } from "../../fakes/fakesOrders.js"
import { fakeUser } from "../../fakes/fakeUsers.js"
import UsersModel from "../../../src/models/Users.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"
import SettingsModel from "../../../src/models/Settings.js"
import YearlyStatisticsModel from "../../../src/models/YearlyStatistics.js"
import { jest } from "@jest/globals"
import { createFakeCategoriesArray } from "../../fakes/fakeCategoriesArray.js"

jest.unstable_mockModule("../../../src/utilities/sendEmail.js", () => ({
    __esModule: true,
    default: jest.fn(() => true)
}));

const { userRequest, closeTestingServer } = (await import("../../helpers/testRequest.js"))
const { default: sendEmail } = (await import("../../../src/utilities/sendEmail.js"));

beforeAll(async () => {
    await createFakeCategoriesArray();
})

afterAll(async () => {
    await SettingsModel.deleteMany({});
    await UsersModel.deleteMany({});
    await YearlyStatisticsModel.deleteMany({});
    sendEmail.mockRestore();
    await closeTestingServer();
})

afterEach(async () => {
    await OrdersModel.deleteMany({});
})

const routePath = '/api/orders/users'

jest.setTimeout(20_000)

describe("Test 'orders_addNewOrder_post' route handler", () => {

    const product = getRandomProduct()

    it("Should creates an order and returns `true`", async () => {
        const ordersProducts = [`${product._id}-1-${product.price}-${product.category}`];

        const { _id: userId, avatar, userEmail } = await UsersModel.create(fakeUser);
        const userData = { userId, avatar, userEmail };

        const theOrder = createFakeOrder({ userId, products: ordersProducts });
        const requestOptions = { userId, body: { theOrder, user: userData } };

        const response = await userRequest(routePath, "post", requestOptions);
        expect(response.statusCode).toBe(200);
        expect(response.body.ok).toBe(true);
        doesEmailMessageSent(1)
        const order = await OrdersModel.findOne({ userId });
        expect(order).toMatchObject(theOrder)
    })

    it("Should creates an order using discount cobone and returns `true`", async () => {
        const ordersProducts = [`${product._id}-1-${product.price}-${product.category}`];

        const { _id: userId, avatar, userEmail } = await UsersModel.create(fakeUser);
        const userData = { userId, avatar, userEmail };

        const discountCobone = { name: "AMS", value: .2 /* 20% */ }
        const theOrder = createFakeOrder({ userId, products: ordersProducts });
        theOrder.discountCobone = discountCobone

        const requestOptions = { userId, body: { theOrder, user: userData } };

        const response = await userRequest(routePath, "post", requestOptions);
        expect(response.statusCode).toBe(200);
        expect(response.body.ok).toBe(true);
        doesEmailMessageSent(2)
        const order = await OrdersModel.findOne({ userId });
        expect(order).toMatchObject(theOrder)
    })

})

function doesEmailMessageSent(caseNumber) {
    expect(sendEmail).toHaveBeenCalledTimes(caseNumber);
    expect(sendEmail.mock.calls[caseNumber - 1]).toEqual(
        expect.arrayContaining([
            fakeUser.userEmail,
            "Your order has created successfully",
            expect.stringMatching(`Hi ${fakeUser.userName}`),
            expect.stringMatching("We received your order")
        ])
    );
}