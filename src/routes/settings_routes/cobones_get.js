import SettingsController from "../../controllers/settings-controllers/SettingsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function cobones_get(req, res) {
        const options = { toObject: req.query.toObject == "true" }
        const cobones = await SettingsController.getDiscountCobones(options);
        res.status(cobones ? 200 : 400).json(cobones);
    }
)