import UserModel from "../models/Users.js";

const favorites_clear = async (req, res) => {
    try {
        await UserModel.updateOne({ _id: req.params.userId }, { $set: { userFavorites: [] } });
        res.status(200).json(true);
    } catch (error) {
        res.status(400).json(null);
    }
}

export default favorites_clear;