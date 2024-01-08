import SettingsController from "../../controllers/settings-controllers/SettingsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function cobones_addCobone_post(req, res) {
        const { cobone } = req.body;
        const response = await SettingsController.addDiscountCobone(cobone);
        res.status(response ? 200 : 400).json(response);
    }
)
