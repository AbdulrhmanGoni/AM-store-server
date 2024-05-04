import SettingsModel from "../../../src/models/Settings.js";
import { fakeSettingsObject } from "../../fakes/fakeSettingsObject.js";
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"

afterAll(async () => {
    await SettingsModel.deleteMany();
    await new SettingsModel().save();
    await closeTestingServer();
})

const routePath = "/api/settings";

describe(`GET ${routePath}`, () => {

    it("Should returns the default settings", async () => {
        const response = await adminRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        const defaultSettings = new SettingsModel();
        delete response.body._id;
        expect(defaultSettings).toMatchObject(response.body);
    })

    it("Should returns the full settings object", async () => {
        await SettingsModel.updateOne({}, fakeSettingsObject);

        const response = await adminRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(fakeSettingsObject);
    })

})