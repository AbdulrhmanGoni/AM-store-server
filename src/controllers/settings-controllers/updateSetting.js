import SettingsModel from "../../models/Settings.js";

export default async function updateSetting(setting, newValue) {
    try {
        const res = await SettingsModel.updateOne({}, { [setting]: newValue });
        return !!res.modifiedCount
    } catch (error) {
        console.log(error)
        return;
    }
}