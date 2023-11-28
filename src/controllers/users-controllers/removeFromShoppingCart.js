import UsersModel from '../../models/Users.js'

export default async function removeFromShoppingCart(userId, productId) {
    try {
        const { modifiedCount } = await UsersModel.updateOne({ _id: userId }, { $pull: { userShoppingCart: new RegExp(productId) } });
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }
}
