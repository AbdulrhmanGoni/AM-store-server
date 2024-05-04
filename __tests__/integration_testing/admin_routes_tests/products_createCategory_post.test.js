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
    await SettingsModel.updateOne({}, fakeSettingsObject);
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

    it("Should returns \"400\" error with \"The category already exist\" message", async () => {
        const settings = await SettingsModel.findOne({}, ["productsCategories"]);
        const existingCategory = settings.productsCategories[0];
        const oldCategoriesLength = settings.productsCategories.length;
        const response = await adminRequest(routePath + `?category=${existingCategory}`, "post");
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toMatch("The category already exist");
        expect(response.body.status).toMatch("Fail");
        const { productsCategories } = await SettingsModel.findOne({});
        expect(productsCategories.length).toBe(oldCategoriesLength);
        expect(productsCategories.includes(existingCategory)).toBe(true);
    })

    it("Should returns \"400\" error with \"Ivalid Category Name\" message", async () => {
        const settings = await SettingsModel.findOne({}, ["productsCategories"]);
        const oldCategoriesLength = settings.productsCategories.length;
        const response = await adminRequest(routePath, "post");
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toMatch("Ivalid Category Name");
        expect(response.body.status).toMatch("Fail");
        const { productsCategories } = await SettingsModel.findOne({});
        expect(productsCategories.length).toBe(oldCategoriesLength);
    })

})