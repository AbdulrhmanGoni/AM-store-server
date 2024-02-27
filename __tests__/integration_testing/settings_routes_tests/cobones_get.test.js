import SettingsModel from "../../../src/models/Settings.js";
import { arrayOfFakesDiscountCobones } from "../../fakes/fakeDiscountCobones.js";
import { anyRequest, closeTestingServer } from "../../helpers/testRequest.js"

afterAll(async () => {
    await SettingsModel.deleteMany({})
    await closeTestingServer();
})
beforeAll(async () => {
    await SettingsModel.deleteMany({})
})

const routePath = "/api/settings/cobones"


describe("GET /api/settings/cobones", () => {


    it("Should returns an empty object (for users)", async () => {
        const response = await anyRequest(routePath + "?toObject=true", "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({})
    })

    it("Should returns an empty array (for admins)", async () => {
        const response = await anyRequest(routePath, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(0)
    })

    it("Should returns an object its keys represent cobone name and the values are the discounts (for users)", async () => {
        await SettingsModel.create({ discountCobones: arrayOfFakesDiscountCobones });
        const response = await anyRequest(routePath + "?toObject=true", "get");
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({ AMS: .15, King: .1 });
    })

    it("Should returns an array of objects `{ name: string, value: number }` (for admins)", async () => {
        const response = await anyRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    value: expect.any(Number),
                })
            ])
        );
    })

})