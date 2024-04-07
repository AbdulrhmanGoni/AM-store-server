import SettingsModel from "../../../src/models/Settings.js";
import { fakeSettingsObject } from "../../fakes/fakeSettingsObject.js";
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"

afterAll(async () => {
    await SettingsModel.deleteMany();
    await closeTestingServer();
})

beforeAll(async () => {
    await SettingsModel.create(fakeSettingsObject)
})

const routePath = "/api/settings"


describe("GET /api/settings", () => {

    it("Should returns an empty object (for users)", async () => {
        const response = await adminRequest(routePath, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject(fakeSettingsObject)
    })

    it("Should returns `null`", async () => {
        await SettingsModel.deleteMany({})
        const response = await adminRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeNull();
    })

})