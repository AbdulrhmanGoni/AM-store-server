import UsersModel from '../../models/Users.js';

export default async function addToShoppingCart(userId, { productId, count }) {
    try {
        let addedSuccessfully = false
        const filter = { _id: userId };
        const { modifiedCount } = await UsersModel.updateOne(
            { ...filter, userShoppingCart: new RegExp(productId) },
            { $set: { "userShoppingCart.$": `${productId}-${count}` } },
            { projection: { _id: 1 } }
        );
        addedSuccessfully = !!modifiedCount;
        if (!modifiedCount) {
            const { modifiedCount } = await UsersModel.updateOne(filter, { $push: { userShoppingCart: productId + "-1" } });
            addedSuccessfully = !!modifiedCount;
        }

        return addedSuccessfully;
    } catch (error) {
        console.log(error);
        return null;
    }
}
