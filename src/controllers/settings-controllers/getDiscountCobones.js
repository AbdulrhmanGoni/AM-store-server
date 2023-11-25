import SettingsModule from "../../models/Settings.js";


export default async function getDiscountCobones() {
    try {
        const [{ cobones }] = await SettingsModule.find();
        const cobonesObject = {};
        for (let i = 0; i < cobones.length; i++) {
            cobonesObject[cobones[i].name] = cobones[i].value
        }

        return cobonesObject
    } catch (error) {
        console.log(error)
        return null
    }
}
