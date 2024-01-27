import SettingsModel from "../../../src/models/Settings.js";
// import { arrayOfFakesDiscountCobones } from "../../fakes/fakeDiscountCobones.js";
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"
import isValidUUID from "../../helpers/isValidUUID.js"

beforeAll(async () => {
    await SettingsModel.create({})
})

afterAll(async () => {
    await SettingsModel.deleteMany({})
    closeTestingServer();
})

const routePath = "/api/settings/cobones"

describe("Test 'cobones_addCobone_post' route handler", () => {

    it("Should adds a discount cobone and returns the id of the added cobone", async () => {
        const newCobone = { name: "TEST", value: .25 }
        const requestBody = { cobone: newCobone }
        const response = await adminRequest(routePath, "post", { body: requestBody })
        expect(response.statusCode).toBe(200)
        expect(isValidUUID(response.body)).toBe(true)
        const [{ discountCobones }] = await SettingsModel.find({}, { discountCobones: true })
        expect(discountCobones[0]).toMatchObject(newCobone)
    })

})