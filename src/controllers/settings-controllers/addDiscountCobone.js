import SettingsModel from "../../models/Settings.js";
import crypto from "crypto";

export default async function addDiscountCobone(cobone) {
    try {
        const coboneId = crypto.randomUUID();
        const updateQuery = {
            $addToSet: {
                discountCobones: { id: coboneId, ...cobone }
            }
        };
        const result = await SettingsModel.updateOne({}, updateQuery)
        return result.modifiedCount ? coboneId : false;
    } catch (error) {
        console.log(error)
        return null;
    }
} 