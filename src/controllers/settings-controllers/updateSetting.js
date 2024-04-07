import SettingsModel from "../../models/Settings.js";

export default async function updateSetting(setting, newValue, session) {
    try {
        const res = await SettingsModel.updateOne({}, { [setting]: newValue }, { session });
        return !!res.modifiedCount
    } catch (error) {
        console.log(error)
        return;
    }
}