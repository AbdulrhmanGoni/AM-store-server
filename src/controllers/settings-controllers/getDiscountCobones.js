import SettingsModule from "../../models/Settings.js";

export default async function getDiscountCobones() {
    try {
        const [{ discountCobones }] = await SettingsModule.find({}, { discountCobones: 1 });
        const cobonesObject = {};
        for (let i = 0; i < discountCobones.length; i++) {
            cobonesObject[discountCobones[i].name] = discountCobones[i].value
        }
        return cobonesObject;
    } catch (error) {
        console.log(error)
        return null
    }
}
