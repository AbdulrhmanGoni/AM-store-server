import SettingsModel from "../../models/Settings.js";

export default async function createCategory(category, session) {
    try {
        const respond = await SettingsModel.updateOne(
            { productsCategories: { $nin: [category] } },
            { $addToSet: { productsCategories: [category] } },
            { session }
        );

        if (respond.acknowledged && respond.modifiedCount === 0) {
            return null
        }
        return !!respond.modifiedCount
    } catch (error) {
        console.log(error)
        return;
    }
}