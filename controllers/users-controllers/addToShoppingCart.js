import UserModel from '../../models/Users.js';
import { userDataTypes } from '../../CONSTANT/projections.js';

export default async function addToShoppingCart(userId, { productId, count }) {
    try {
        let addedSuccessfully = false
        const filter = { _id: userId };
        const { modifiedCount } = await UserModel.updateOne(
            { ...filter, userShoppingCart: new RegExp(productId) },
            { $set: { "userShoppingCart.$": `${productId}-${count}` } },
            { projection: userDataTypes._id }
        );
        addedSuccessfully = !!modifiedCount;
        if (!modifiedCount) {
            const { modifiedCount } = await UserModel.updateOne(filter, { $push: { userShoppingCart: productId + "-1" } });
            addedSuccessfully = !!modifiedCount;
        }

        return addedSuccessfully;
    } catch (error) {
        console.log(error);
        return null;
    }
}
