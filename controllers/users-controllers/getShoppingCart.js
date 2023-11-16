import UserModel from "../../models/Users.js";
import ProductsModule from "../../models/Products.js";
import idHandler from "../../functions/idHandler.js";
import { productDataTypes, userDataTypes } from "../../CONSTANT/projections.js";

export default async function getShoppingCart(userId) {
    try {
        const { userShoppingCart } = await UserModel.findById(userId, userDataTypes.userShoppingCart);
        const productsIds = userShoppingCart.map((productId) => idHandler(productId).id);
        const products = await ProductsModule.find({ _id: { $in: productsIds } }, productDataTypes.basic);
        return products.map((product) => {
            let productCount = idHandler(userShoppingCart.find((productId) => idHandler(productId).id === product.id)).count;
            product.count = productCount;
            return product;
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}
