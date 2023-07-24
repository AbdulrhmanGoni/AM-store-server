import UserModel from "../models/Users.js";

const favorites_setCart = async (req, res) => {
    try {
        await UserModel.updateOne({ _id: req.params.userId }, { $set: { userFavorites: req.body.favorites } });
        res.status(200).json(true);
    } catch (error) {
        res.status(400).json(null);
    }
}

export default favorites_setCart;