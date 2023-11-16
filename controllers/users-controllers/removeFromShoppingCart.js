import UserModel from '../../models/Users.js'

export default async function removeFromShoppingCart(userId, productId) {
    try {
        const { modifiedCount } = await UserModel.updateOne(userId, { $pull: { userShoppingCart: new RegExp(productId) } });
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }
}
