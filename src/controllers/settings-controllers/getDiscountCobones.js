import SettingsModel from "../../models/Settings.js";

export default async function getDiscountCobones({ toObject }) {
    try {
        const [results] = await SettingsModel.find({}, { discountCobones: 1 });
        const { discountCobones } = results || { discountCobones: [] }
        if (toObject) {
            const cobonesObject = {};
            for (let i = 0; i < discountCobones.length; i++) {
                cobonesObject[discountCobones[i].name] = discountCobones[i].value
            }
            return cobonesObject;
        } else return discountCobones
    } catch (error) {
        console.log(error)
        return null
    }
}
