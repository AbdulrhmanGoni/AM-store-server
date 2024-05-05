import SettingsModel from "../../../src/models/Settings.js";
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"
import { fakeSettingsObject } from "../../fakes/fakeSettingsObject.js";
import redisClient from "../../../src/configuration/redisClient.js";

afterAll(async () => {
    await redisClient.flushAll()
    await SettingsModel.deleteMany({})
    await closeTestingServer();
})

beforeAll(async () => {
    await SettingsModel.create(fakeSettingsObject)
})
const routePath = "/api/settings";

describe(`POST ${routePath}`, () => {

    it("Should updates `defaultMonthlyTarget` setting's value to 4450", async () => {
        await updateSettingTest("defaultMonthlyTarget", 4450)
    })

    it("Should updates delivery price setting to 6", async () => {
        await updateSettingTest("deliveryPrice", 6)
    })

    it("Should updates the minimum free delivery entitlement price to 90", async () => {
        await updateSettingTest("minFreeDeliveryEntitlementPrice", 90)
    })

    it("Should updates `allowUsersChangePasswordEveryNDays` setting's value to 28", async () => {
        await updateSettingTest("allowUsersChangePasswordEveryNDays", 28)
    })

})

async function updateSettingTest(settingName, newValue) {
    const requestBody = { setting: settingName, newValue };
    const request = await adminRequest(routePath, "post", { body: requestBody });
    expect(request.statusCode).toBe(200);
    expect(request.body).toBe(true);
    const settings = await SettingsModel.findOne({}, { [settingName]: true });
    expect(settings[settingName]).toBe(newValue);
}