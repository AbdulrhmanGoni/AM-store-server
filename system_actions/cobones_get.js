import StoreVariablesModule from "../models/StoreVariables.js";

async function cobones_get(req, res) {
    try {
        const { cobones } = await StoreVariablesModule.findOne({ varName: "discountCobones" });
        res.status(200).json(cobones);
    } catch (error) {
        console.log(error)
        res.status(400).json(null);
    }
}

export default cobones_get