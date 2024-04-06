import { storeVariablesProjection } from "../../CONSTANT/storeVariables.js";
import SettingsModel from "../../models/Settings.js";

export default async function getStoreVariables() {
    try {
        return await SettingsModel.findOne({}, storeVariablesProjection)
    } catch (error) {
        console.log(error)
        return;
    }
}