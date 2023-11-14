import idHandler from "../../functions/idHandler.js";
import UserModel from "../../models/Users.js";

export default async function setShoppingCart(userId, shoppingCart) {
    try {
        const filter = { _id: userId };
        const productsIds = shoppingCart.map((product => idHandler(product._id, product.count).id));
        const { matchedCount, modifiedCount } = await UserModel.updateOne(filter, { $set: { userShoppingCart: productsIds } });
        return !!(matchedCount && modifiedCount);
    } catch (error) {
        return null;
    }
}