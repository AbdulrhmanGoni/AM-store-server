import SettingsModel from "../../models/Settings.js";

export default async function createCategory(category, session) {
    try {
        const respond = await SettingsModel.updateOne(
            {},
            { $push: { productsCategories: [category] } },
            { session }
        );
        return !!respond.modifiedCount;
    } catch (error) {
        console.log(error)
        return;
    }
}