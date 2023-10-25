import StoreVariablesModule from "../models/StoreVariables.js";

async function cobones_get(req, res) {
    try {
        const { cobones } = await StoreVariablesModule.findOne({ varName: "discountCobones" });
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