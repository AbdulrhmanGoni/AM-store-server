import UserModel from "../../models/Users.js";

const shoppingCart_remove = async (req, res, next) => {
    try {
        const { productId, type } = req.body;
        const filter = { _id: req.params.userId };
        if (type === "clear") {
            await UserModel.updateOne(filter, { $set: { userShoppingCart: [] } });
            next();
        } else {
            await UserModel.updateOne(filter, { $pull: { userShoppingCart: new RegExp(productId) } });
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default shoppingCart_remove;