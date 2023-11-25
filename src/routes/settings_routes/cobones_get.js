import SettingsController from "../../controllers/settings-controllers/SettingsController.js";

export default async function cobones_get(_, res) {
    try {
        const cobones = await SettingsController.getDiscountCobones();
        res.status(200).json(cobones);
    } catch (error) {
        res.status(400).json(null);
    }
}