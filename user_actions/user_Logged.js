import { userDataTypes } from "../CONSTANT/projections.js";
import UserModel from "../models/Users.js";
import shoppingCart_getProductsData from "./shoppingCart_getProductsData.js";

export default async function user_Logged(req, res) {
    try {
        const userData = await UserModel.findById(req.params.userId, userDataTypes.initial);
        if (userData) {
            const shoppingCart = await shoppingCart_getProductsData(userData.userShoppingCart);
            const favorites = userData.userFavorites;
            userData.userShoppingCart = undefined;
            userData.userFavorites = undefined;
            res.status(200).json({ userData, shoppingCart, favorites });
        } else res.status(400).json(null);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
