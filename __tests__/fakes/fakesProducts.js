import { readFileSync } from "fs";
import SettingsModel from "../../src/models/Settings";

const path = "./__tests__/fakes/fakesProducts.json"
const products = JSON.parse(readFileSync(path, { encoding: "utf8" }))

export const totalProducts = products.length

export function getRandomProduct() {
    return products[Math.floor(Math.random() * totalProducts)]
}

export function getArrayOfProducts(length = totalProducts) {
    return products.slice(0, length)
}

export const fakeCategoriesArray = ["figures", "panels", "clothes"]

export async function createFakeCategoriesArray() {
    return await SettingsModel.create({ productsCategories: fakeCategoriesArray })
};
