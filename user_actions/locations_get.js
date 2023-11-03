import { userDataTypes } from "../CONSTANT/projections.js";
import UserModel from "../models/Users.js";

const locations_get = async (req, res) => {
    try {
        const { userAddress } = await UserModel.findById(req.params.userId, userDataTypes.addresses)
        res.status(200).json(userAddress);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default locations_get;