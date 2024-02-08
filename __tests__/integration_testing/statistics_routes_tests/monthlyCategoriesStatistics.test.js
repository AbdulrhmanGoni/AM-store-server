import { MONTHES } from "../../../src/CONSTANT/MONTHES.js"
import SettingsModel from "../../../src/models/Settings.js"
import YearlyStatisticsModel from "../../../src/models/YearlyStatistics.js"
import { createFakeCategoriesArray } from "../../fakes/fakesProducts.js"
import { getFakeYearStatistics } from "../../fakes/fakeYearlyStatistics.js"
import { closeTestingServer, adminRequest } from "../../helpers/testRequest.js"

beforeAll(async () => {
    productsCategories = (await createFakeCategoriesArray()).productsCategories
})

afterEach(async () => {
    await YearlyStatisticsModel.deleteMany({});
})

afterAll(async () => {
    await SettingsModel.deleteMany({});
    await closeTestingServer();
})

let productsCategories;
const queryKey = "monthly-categories-statistics"
const routePath = (year) => `/api/statistics?queryKey=${queryKey}&year=${year}`

describe(`Test 'statistics_get' route handler with queryKey: "${queryKey}"`, () => {

    it("Should returns the initial monthly categories statistics", async () => {
        const year = new Date().getFullYear();
        const response = await adminRequest(routePath(year), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.categories).toHaveLength(productsCategories.length);
        response.body.categories.forEach(({ category, monthlyStatistics }) => {
            expect(productsCategories).toContain(category)
            MONTHES.forEach((month, index) => {
                expect(monthlyStatistics[index]).toMatchObject({
                    month: month,
                    totalEarnings: 0,
                    productsSold: 0
                })
            });
        })
    })

    it("Should returns the details of monthly categories statistics", async () => {
        const year = new Date().getFullYear();
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