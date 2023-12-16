import SettingsModel from "../../models/Settings.js";

export default async function addDiscountCobone(cobone) {
    try {
        const updateQuery = { $addToSet: { discountCobones: cobone } };
        const result = await SettingsModel.updateOne({}, updateQuery)
        return !!result.modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }
} 