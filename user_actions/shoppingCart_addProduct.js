import UserModel from "../models/Users.js";
import { userDataTypes, productDataTypes } from "../CONSTANT/dataTypes.js";
import ProductsModule from "../models/Products.js";

const shoppingCart_addProduct = async (req, res, next) => {
    try {
        const filter = { _id: req.params.userId };
        const { productId, count } = req.body;
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
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}


export default shoppingCart_addProduct;