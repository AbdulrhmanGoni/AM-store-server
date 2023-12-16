import SettingsController from "../../controllers/settings-controllers/SettingsController.js";

export default async function cobones_addCobone_post(req, res) {
    try {
        const { cobone } = req.body;
        const response = await SettingsController.addDiscountCobone(cobone);
        res.status(response ? 200 : 400).json(response);
    } catch (error) {
        res.status(400).json({ message: "Unexpected error" });
    }
}
