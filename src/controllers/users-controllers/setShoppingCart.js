import UsersModel from "../../models/Users.js";

export default async function setShoppingCart(userId, productsIds) {
    try {
        const filter = { _id: userId };
        const { matchedCount, modifiedCount } = await UsersModel.updateOne(filter, { $set: { userShoppingCart: productsIds } });
        return !!(matchedCount && modifiedCount);
    } catch (error) {
        console.log(error)
        return null;
    }
}