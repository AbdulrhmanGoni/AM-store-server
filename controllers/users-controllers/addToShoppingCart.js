import UserModel from '../../models/Users.js';
import ProductsModule from '../../models/Products.js';
import { productDataTypes, userDataTypes } from '../../CONSTANT/projections.js';

export default async function addToShoppingCart(userId, { productId, count }) {
    try {
        const filter = { _id: userId };
        const { modifiedCount } = await UserModel.updateOne(
            { ...filter, userShoppingCart: new RegExp(productId) },
            { $set: { "userShoppingCart.$": `${productId}-${count}` } },
            { projection: userDataTypes._id }
        );
        if (!modifiedCount) {
            await UserModel.updateOne(filter, { $push: { userShoppingCart: productId + "-1" } });
        }
        const product = await ProductsModule.findById(productId, productDataTypes.basic);
        product.count = count ?? 1
        return product;
    } catch (error) {
        console.log(error);
        return null;
    }
}
