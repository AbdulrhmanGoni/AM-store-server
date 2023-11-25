import UserModel from '../../models/Users.js';

export default async function clearShoppingCart(userId) {
    try {
        const { modifiedCount } = await UserModel.updateOne({ _id: userId }, { $set: { userShoppingCart: [] } });
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }
}
