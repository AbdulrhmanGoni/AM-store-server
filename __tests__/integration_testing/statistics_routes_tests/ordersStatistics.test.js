import OrdersModel from "../../../src/models/Orders.js";
import { createArrayOfFakeOrders } from "../../fakes/fakesOrders.js";
import { closeTestingServer, adminRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await OrdersModel.deleteMany({});
    await closeTestingServer();
})

const queryKey = "orders-statistics"
const routePath = (year) => `/api/statistics?queryKey=${queryKey}&year=${year}`

describe(`Test 'statistics_get' route handler with queryKey: "${queryKey}"`, () => {

    it("Should returns the initial orders statistics object", async () => {
        const year = new Date().getFullYear()
        const response = await adminRequest(routePath(year), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            year: year,
            statistics: {
                totalOrders: 0,
                completedOrders: 0,
                pendingOrders: 0,
                canceledOrders: 0
            }
        })
    })

    it("Should returns orders statistics object", async () => {
        const year = new Date().getFullYear()
        const fakesOrders = createArrayOfFakeOrders()
        await OrdersModel.insertMany(fakesOrders);
        const response = await adminRequest(routePath(year), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            year,
            statistics: {
                totalOrders: fakesOrders.length,
                completedOrders: expect.any(Number),
                pendingOrders: expect.any(Number),
                canceledOrders: expect.any(Number)
            }
        })
    })

})
