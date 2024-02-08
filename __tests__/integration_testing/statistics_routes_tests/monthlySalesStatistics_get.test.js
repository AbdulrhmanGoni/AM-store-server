import { MONTHES } from "../../../src/CONSTANT/MONTHES.js"
import SettingsModel from "../../../src/models/Settings.js"
import YearlyStatisticsModel from "../../../src/models/YearlyStatistics.js"
import { fakeYearStatistics } from "../../fakes/fakeStatistics.js"
import { closeTestingServer, adminRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await SettingsModel.deleteMany({});
    await closeTestingServer();
})

afterEach(async () => {
    await YearlyStatisticsModel.deleteMany({});
})

const routePath = (year) => `/api/statistics?queryKey=monthly-sales-statistics&year=${year}`

describe("Test 'statistics_get' route handler with `queryKey: \"monthly-sales-statistics\"`", () => {

    it("Should returns the initial monthly sales statistics", async () => {
        const year = new Date().getFullYear();
        const response = await adminRequest(routePath(year), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.monthes).toHaveLength(12);
        MONTHES.forEach((month, index) => {
            expect(response.body.monthes[index]).toMatchObject({
                month: month,
                totalEarnings: 0,
                productsSold: 0,
                totalOrders: 0,
                earningsTarget: 0
            })
        });
    })

    it("Should returns the details of monthly sales statistics", async () => {
        const year = new Date().getFullYear();
        const { monthes: fakeMonthlySalesStatistics } = await YearlyStatisticsModel.create(fakeYearStatistics(year));
        const response = await adminRequest(routePath(year), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.monthes).toHaveLength(12);
        response.body.monthes.forEach((monthStatistics, index) => {
            expect(fakeMonthlySalesStatistics[index]).toMatchObject(monthStatistics)
        });
    })

})