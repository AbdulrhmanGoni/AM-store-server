import redisClient from "../../../src/configuration/redisClient.js";
import SettingsModel from "../../../src/models/Settings.js"
import { fakeSettingsObject } from "../../fakes/fakeSettingsObject.js"
import { userRequest, closeTestingServer } from "../../helpers/testRequest.js"

beforeAll(async () => {
    await SettingsModel.create(fakeSettingsObject);
})

afterAll(async () => {
    redisClient.flushAll()
    await SettingsModel.deleteMany();
    await closeTestingServer();
})

const routePath = "/api/settings/variables";

describe("GET /api/settings/variables", () => {

    it("Should returns store's variables object", async () => {
        const response = await userRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        expect(fakeSettingsObject).toMatchObject(response.body);
    })

})