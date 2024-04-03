import SettingsModel from "../../models/Settings.js";

export default async function getSettings() {
    try {
        return await SettingsModel.findOne();
    } catch (error) {
        console.log(error)
        return;
    }
}