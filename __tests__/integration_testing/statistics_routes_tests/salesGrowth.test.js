import ProductsModel from "../../../src/models/Products.js"
import SettingsModel from "../../../src/models/Settings.js";
import YearlyStatisticsModel from "../../../src/models/YearlyStatistics.js";
import { getFakeYearStatistics } from "../../fakes/fakeYearlyStatistics.js";
import { createFakeCategoriesArray } from "../../fakes/fakesProducts.js";
import { closeTestingServer, adminRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await SettingsModel.deleteMany({});
    await YearlyStatisticsModel.deleteMany({});
    await closeTestingServer();
})

afterEach(async () => {
    await ProductsModel.deleteMany({});
})

const queryKey = "sales-growth"
const routePath = `/api/statistics?queryKey=${queryKey}`

describe(`GET /api/statistics?queryKey=${queryKey}`, () => {

    it("Should returns `null` because there no sales", async () => {
        const response = await adminRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeNull();
    })

    it("Should returns the salse growth of last month", async () => {
        const year = new Date().getFullYear();
        await YearlyStatisticsModel.insertMany([getFakeYearStatistics(year - 1), getFakeYearStatistics(year)]);
        await createFakeCategoriesArray();
        const response = await adminRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            lastMonth: {
                year: expect.any(Number),
                month: expect.any(String),
                earnings: expect.any(Number)
            },
            beforeLastMonth: {
                year: expect.any(Number),
                month: expect.any(String),
                earnings: expect.any(Number)
            },
            growthRate: expect.any(Number)
        });

        const { lastMonth, beforeLastMonth } = response.body;
        const growthRate = (lastMonth.earnings - beforeLastMonth.earnings) / beforeLastMonth.earnings * 100;
        expect(+(growthRate.toFixed(2))).toBe(response.body.growthRate);
    })

})
