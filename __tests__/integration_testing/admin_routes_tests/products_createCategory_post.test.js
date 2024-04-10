import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"
import { fakeSettingsObject } from "../../fakes/fakeSettingsObject.js"
import SettingsModel from "../../../src/models/Settings.js"
import redisClient from "../../../src/configuration/redisClient.js";

afterAll(async () => {
    await SettingsModel.deleteMany({});
    await redisClient.flushAll();
    await closeTestingServer();
})

beforeAll(async () => {
    await SettingsModel.create(fakeSettingsObject);
})

const routePath = "/api/admin/products/create-category"

describe(`POST ${routePath}`, () => {

    it("Should creates \"electronics\" category and returns `true`", async () => {
        const newCategory = "electronics";
        const settings = await SettingsModel.findOne({}, ["productsCategories"]);
        const oldCategoriesLength = settings.productsCategories.length;
        const response = await adminRequest(routePath + `?category=${newCategory}`, "post");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        const { productsCategories } = await SettingsModel.findOne({});
        expect(productsCategories.length).toBe(oldCategoriesLength + 1);
        expect(productsCategories.includes(newCategory)).toBe(true);
    })

    it("Should creates \"sport\" category and returns `true`", async () => {
        const newCategory = "sport";
        const settings = await SettingsModel.findOne({}, ["productsCategories"]);
        const oldCategoriesLength = settings.productsCategories.length;
        const response = await adminRequest(routePath + `?category=${newCategory}`, "post");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
        const { productsCategories } = await SettingsModel.findOne({});
        expect(productsCategories.length).toBe(oldCategoriesLength + 1);
        expect(productsCategories.includes(newCategory)).toBe(true);

    })

    it("Should returns \"400\" error with \"You didn't provide a valid category name\" message", async () => {
        const settings = await SettingsModel.findOne({}, ["productsCategories"]);
        const oldCategoriesLength = settings.productsCategories.length;
        const response = await adminRequest(routePath, "post");
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toMatch("You didn't provide a valid category name");
        expect(response.body.status).toMatch("Fail");
        const { productsCategories } = await SettingsModel.findOne({});
        expect(productsCategories.length).toBe(oldCategoriesLength);
    })

})