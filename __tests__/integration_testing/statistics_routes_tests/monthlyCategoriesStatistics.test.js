import SettingsModel from "../../../src/models/Settings.js"
import YearlyStatisticsModel from "../../../src/models/YearlyStatistics.js"
import { createFakeCategoriesArray } from "../../fakes/fakesProducts.js"
import { getFakeYearStatistics } from "../../fakes/fakeYearlyStatistics.js"
import { closeTestingServer, adminRequest } from "../../helpers/testRequest.js"


afterEach(async () => {
    await YearlyStatisticsModel.deleteMany({});
})

afterAll(async () => {
    await SettingsModel.deleteMany({});
    await closeTestingServer();
})

const queryKey = "monthly-categories-statistics"
const routePath = (year) => `/api/statistics?queryKey=${queryKey}&year=${year}`

describe(`GET /api/statistics?queryKey=${queryKey}`, () => {

    it("Should returns the default monthly categories statistics", async () => {
        const year = new Date().getFullYear();
        const response = await adminRequest(routePath(year), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.categories).toHaveLength(0);
    })

    it("Should returns the details of fake monthly categories statistics", async () => {
        const year = new Date().getFullYear();
        const productsCategories = await createFakeCategoriesArray();
        const { categories: fakeMonthlyCategoriesStatistics } = await YearlyStatisticsModel.create(getFakeYearStatistics(year));
        const response = await adminRequest(routePath(year), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.categories).toHaveLength(productsCategories.length);
        fakeMonthlyCategoriesStatistics.forEach(({ category, monthlyStatistics }, index) => {
            expect(response.body.categories[index].category).toBe(category)
            monthlyStatistics.forEach((month, i) => {
                expect(month).toMatchObject(response.body.categories[index].monthlyStatistics[i])
            });
        })
    })

})