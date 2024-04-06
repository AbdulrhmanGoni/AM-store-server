import cacheOrQuery from "../../cache/cacheOrQuery.js";
import SettingsController from "../../controllers/settings-controllers/SettingsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function settings_storeVariables_get(req, res) {
        const result = await cacheOrQuery("store-variables", SettingsController.getStoreVariables());
        res.status(result ? 200 : 400).json(result)
    }
)