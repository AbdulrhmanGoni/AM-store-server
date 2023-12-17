import SettingsModel from "../../models/Settings.js";
import { v4 as uuidv4 } from 'uuid';

export default async function addDiscountCobone(cobone) {
    try {
        const coboneId = uuidv4();
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