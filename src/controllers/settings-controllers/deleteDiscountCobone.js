import SettingsModel from "../../models/Settings.js";

export default async function deleteDiscountCobone(coboneId) {
    try {
        const updateQuery = { $pull: { discountCobones: { id: coboneId } } };
        const result = await SettingsModel.updateOne({}, updateQuery)
        return !!result.modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }
} 