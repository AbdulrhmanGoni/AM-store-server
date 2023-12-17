import SettingsController from "../../controllers/settings-controllers/SettingsController.js";

export default async function cobones_deleteCobone_delete(req, res) {
    try {
        const { coboneId } = req.body;
        const response = await SettingsController.deleteDiscountCobone(coboneId);
        res.status(response ? 200 : 400).json(response);
    } catch (error) {
        res.status(400).json({ message: "Unexpected error" });
    }
}
