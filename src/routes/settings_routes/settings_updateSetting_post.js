import SettingsController from "../../controllers/settings-controllers/SettingsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function settings_updateSetting_post(req, res) {
        const { setting, newValue } = req.body;
        const respond = await SettingsController.updateSetting(setting, newValue);
        res.status(respond === undefined ? 400 : 200).json(respond);
    }
)