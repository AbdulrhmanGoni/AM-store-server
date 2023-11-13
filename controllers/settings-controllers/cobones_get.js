import SettingsModule from "../../models/Settings.js";

async function cobones_get(_, res) {
    try {
        const [{ cobones }] = await SettingsModule.find();
        const cobonesObject = {}
        for (let i = 0; i < cobones.length; i++) {
            cobonesObject[cobones[i].name] = cobones[i].value
        }

        res.status(200).json(cobonesObject);
    } catch (error) {
        console.log(error)
        res.status(400).json(null);
    }
}

export default cobones_get