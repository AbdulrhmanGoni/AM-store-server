import UserModel from "../models/Users.js";

const favorites_toggle = async (req, res) => {
    try {
        let isToggled = false
        const { userId } = req.params;
        const { productId } = req.body;
        const filter = { _id: userId, userFavorites: { $in: [productId] } };
        const updateQuery = { userFavorites: productId };
        const { matchedCount } = await UserModel.updateOne(filter, { $pull: updateQuery });
        if (matchedCount) isToggled = true;
        else {
            const { matchedCount } = await UserModel.updateOne({ _id: userId }, { $push: updateQuery });
            if (matchedCount) isToggled = true;
            else isToggled = false;
        }
        if (isToggled) res.status(200).json(productId);
        else res.status(200).json(false)
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}


export default favorites_toggle;