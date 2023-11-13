import idHandler from "../../functions/idHandler.js";
import UserModel from "../../models/Users.js";

const shoppingCart_setCart = async (req, res) => {
    try {
        const filter = { _id: req.params.userId };
        const productsIds = req.body.shoppingCart.map((product => idHandler(product._id, product.count).id));
        await UserModel.updateOne(filter, { $set: { userShoppingCart: productsIds } });
        res.status(200).json(true);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}


export default shoppingCart_setCart;