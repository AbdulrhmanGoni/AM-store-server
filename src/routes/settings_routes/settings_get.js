import SettingsController from "../../controllers/settings-controllers/SettingsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function settings_get(_req, res) {
        const settings = await SettingsController.getSettings()
        res.status(200).json(settings)
    }
)