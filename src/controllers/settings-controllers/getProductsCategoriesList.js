import { readFileSync, writeFile, existsSync } from "fs";
import SettingsModel from "../../models/Settings.js";

export default async function getProductsCategoriesList() {
    try {
        const cachePath = "./src/cache/productsCategoriesList.json"
        if (existsSync(cachePath)) {
            const cachedProductsCategoriesList = readFileSync(cachePath, { encoding: "utf8" })
            return JSON.parse(cachedProductsCategoriesList)
        } else {
            const [data] = await SettingsModel.find({}, "productsCategories");
            if (data?.productsCategories) {
                writeFile(cachePath, JSON.stringify(data.productsCategories), () => { })
                return data.productsCategories
            } else return []
        }
    } catch (error) {
        console.log(error)
        return;
    }
}