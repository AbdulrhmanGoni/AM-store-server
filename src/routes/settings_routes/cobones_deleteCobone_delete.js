import SettingsController from "../../controllers/settings-controllers/SettingsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function cobones_deleteCobone_delete(req, res) {
        const { coboneId } = req.body;
        const response = await SettingsController.deleteDiscountCobone(coboneId);
        res.status(response ? 200 : 400).json(response);
    }
)
