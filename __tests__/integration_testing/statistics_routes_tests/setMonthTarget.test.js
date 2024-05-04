import ProductsModel from "../../../src/models/Products.js"
import YearlyStatisticsModel from "../../../src/models/YearlyStatistics.js";
import { getFakeYearStatistics } from "../../fakes/fakeYearlyStatistics.js";
import { closeTestingServer, adminRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await YearlyStatisticsModel.deleteMany({});
    await closeTestingServer();
})

beforeAll(async () => {
    const year = new Date().getFullYear();
    await YearlyStatisticsModel.insertMany([
        getFakeYearStatistics(year - 1),
        getFakeYearStatistics(year + 1)
    ]);
})

afterEach(async () => {
    await ProductsModel.deleteMany({});
})

const routePath = `/api/statistics/monthly-targets`

describe(`POST ${routePath}`, () => {

    it("Should sets the target of the current month to `4000`", async () => {
        await setMonthTargetTest(4000, "current")
    })

    it("Should sets the target of the next month to `5000`", async () => {
        await setMonthTargetTest(5000, "next")
    })

    it("Should returns an error with \"Can't set a target for a passed month\" message", async () => {
        const newTarget = 4750;
        const { year, monthIndex } = prepareDate(-1)
        const requestBody = { year, monthIndex, newTarget };

        const response = await adminRequest(routePath, "post", { body: requestBody });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toMatch("Can't set a target for a passed month");
    })

    it("Should returns an error with \"Invalid Date\" message", async () => {
        const newTarget = 6000;
        const requestBody = {
            year: "any invalid year",
            monthIndex: "any invalid number",
            newTarget
        };

        const response = await adminRequest(routePath, "post", { body: requestBody });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toMatch("Invalid Date");
    })

})

async function setMonthTargetTest(target, month) {
    const newTarget = target;
    const { year, monthIndex } = prepareDate(month === "next" ? 1 : 0)
    const requestBody = { year, monthIndex, newTarget };

    const response = await adminRequest(routePath, "post", { body: requestBody });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(true);

    const { monthes } = await YearlyStatisticsModel.findOne({ year }, { monthes: true });

    expect(monthes[monthIndex].earningsTarget).toBe(newTarget);
}

const prepareDate = (moveMonth = 0) => {
    const date = new Date(new Date().setMonth(new Date().getMonth() + moveMonth))
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    return {
        year,
        monthIndex
    }
}