import OrdersModel from "../../../src/models/Orders.js";
import UsersModel from "../../../src/models/Users.js";
import { fakeUsers } from "../../fakes/fakeUsers.js";
import { getRandomProduct } from "../../fakes/fakesProducts.js";
import { createFakeOrder } from "../../fakes/fakesOrders.js";
import { closeTestingServer, adminRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await UsersModel.deleteMany({});
    await OrdersModel.deleteMany({});
    await closeTestingServer();
})

const queryKey = "top-customers"
const routePath = (limit) => `/api/statistics?queryKey=${queryKey}&limit=${limit}`

describe(`GET /api/statistics?queryKey=${queryKey}`, () => {

    it("Should returns an empty array because there is no users yet", async () => {
        const response = await adminRequest(routePath(3), "get");
        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body)).toHaveLength(0);
    })

    it("Should returns an array of top users based on their spending", async () => {
        const users = await UsersModel.insertMany(fakeUsers);
        const usersOrders = users.map(({ _id: userId }, index) => {
            const product = getRandomProduct()
            const ordersProducts = [`${product._id}-1-${product.price}-${product.category}`]
            const order = createFakeOrder({ userId, products: ordersProducts })
            order.totalPrice += +(`${index + 1}0`)
            return order;
        })
        await OrdersModel.insertMany(usersOrders);
        const response = await adminRequest(routePath(6), "get");
        expect(response.statusCode).toBe(200);
        response.body.forEach((user, index) => {
            expect(user).toMatchObject({
                _id: expect.any(String),
                totalSpending: expect.any(Number),
                totalOrders: expect.any(Number),
                userData: {
                    userName: expect.any(String),
                    userEmail: expect.any(String),
                    avatar: expect.any(String)
                }
            })
            expect(user.totalSpending).toBeGreaterThanOrEqual(response.body[index + 1]?.totalSpending || 0)
        })
    })

})
