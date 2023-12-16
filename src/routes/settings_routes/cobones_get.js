import SettingsController from "../../controllers/settings-controllers/SettingsController.js";

export default async function cobones_get(req, res) {
    try {
        const options = { toObject: req.query.toObject == "true" }
        const cobones = await SettingsController.getDiscountCobones(options);
        res.status(cobones ? 200 : 400).json(cobones);
    } catch (error) {
        res.status(400).json(null);
    }
}