import { userDataTypes } from "../CONSTANT/dataTypes.js";
import UserModel from "../models/Users.js";

const locations_get = async (req, res) => {
    try {
        const { userAddress } = await UserModel.findById(req.params.userId, userDataTypes.addresses)
        userAddress.locationsList.reverse()
        res.status(200).json(userAddress);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default locations_get;