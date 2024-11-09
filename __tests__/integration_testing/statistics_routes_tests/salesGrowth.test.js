import { MONTHES } from "../../../src/CONSTANT/MONTHES.js";
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

    it("Should returns sales growth object with zeros because there no sales", async () => {
        const currentMonthIndex = new Date().getMonth();

        const lastMonth = new Date(new Date().setMonth(currentMonthIndex - 1));
        const beforeLastMonth = new Date(new Date().setMonth(currentMonthIndex - 2));

        const response = await adminRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            lastMonth: {
                year: lastMonth.getFullYear(),
                month: MONTHES[lastMonth.getMonth()],
                earnings: 0
            },
            beforeLastMonth: {
                year: beforeLastMonth.getFullYear(),
                month: MONTHES[beforeLastMonth.getMonth()],
                earnings: 0
            },
            growthRate: 0
        });
    })

    it("Should returns the salse growth of last month", async () => {
        const year = new Date().getFullYear();
        await YearlyStatisticsModel.insertMany([getFakeYearStatistics(year - 1)]);
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
        console.log(growthRate)
        expect(+(growthRate.toFixed(2)) || 0).toBe(response.body.growthRate);
    })

})
