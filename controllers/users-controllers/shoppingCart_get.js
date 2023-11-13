import UserModel from "../../models/Users.js";
import { userDataTypes } from "../../CONSTANT/projections.js";
import shoppingCart_getProductsData from "./shoppingCart_getProductsData.js";

const shoppingCart_get = async (req, res) => {
    try {
        const { userShoppingCart } = await UserModel.findById(req.params.userId, userDataTypes.userShoppingCart);
        const products = await shoppingCart_getProductsData(userShoppingCart);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }

}

export default shoppingCart_get;