import UsersModel from '../../models/Users.js';

export default async function clearShoppingCart(userId) {
    try {
        const { modifiedCount } = await UsersModel.updateOne({ _id: userId }, { $set: { userShoppingCart: [] } });
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }
}
