import UserModel from "../../../models/Users.js";
import { userDataTypes } from "../../../CONSTANT/projections.js";

const favorites_get = async (req, res) => {
    try {
        const { userFavorites } = await UserModel.findById(req.params.userId, userDataTypes.userFavorites);
        res.status(200).json(userFavorites);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default favorites_get;
