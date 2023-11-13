import { userDataTypes } from "../../CONSTANT/projections.js";
import UserModel from "../../models/Users.js";

const userData_get = async (req, res) => {
    try {
        const userData = await UserModel.findById(req.params.userId, userDataTypes[req.query.type ?? "basic"]);
        res.status(200).json(userData);
    } catch {
        res.status(400).json(null);
    }
}

export default userData_get;