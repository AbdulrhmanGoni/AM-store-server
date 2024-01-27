import SettingsModel from "../../../src/models/Settings.js";
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"
import { arrayOfFakesDiscountCobones } from "../../fakes/fakeDiscountCobones.js";

afterAll(async () => {
    await SettingsModel.deleteMany({})
    closeTestingServer();
})

const routePath = "/api/settings/cobones"

describe("Test 'cobones_deleteCobone_delete' route handler", () => {

    it("Should deletes a discount cobone from discounts cobones list in settings collection and returns `true`", async () => {
        await SettingsModel.create({ discountCobones: arrayOfFakesDiscountCobones })
        const coboneToDelete = arrayOfFakesDiscountCobones[0]
        const requestBody = { coboneId: coboneToDelete.id }
        const response = await adminRequest(routePath, "delete", { body: requestBody })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const [{ discountCobones }] = await SettingsModel.find({}, { discountCobones: true })
        expect(discountCobones.length).toBe(arrayOfFakesDiscountCobones.length - 1)
        discountCobones.forEach((cobone) => {
            expect(cobone).not.toMatchObject(coboneToDelete)
        })
    })

})