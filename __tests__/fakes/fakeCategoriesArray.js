import SettingsModel from "../../src/models/Settings.js";

export const fakeCategoriesArray = ["figures", "panels", "clothes"]

export async function createFakeCategoriesArray() {
    return await SettingsModel.create({ productsCategories: fakeCategoriesArray })
};
