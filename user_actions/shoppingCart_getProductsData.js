import { productDataTypes } from '../CONSTANT/projections.js';
import idHandler from '../functions/idHandler.js';
import ProductsModule from "../models/Products.js";

async function shoppingCart_getProductsData(userShoppingCart) {
    const productsIds = userShoppingCart.map((productId) => idHandler(productId).id);
    const products = await ProductsModule.find({ _id: { $in: productsIds } }, productDataTypes.basic);
    return products.map((product) => {
        let productCount = idHandler(userShoppingCart.find((productId) => idHandler(productId).id === product.id)).count;
        product.count = productCount;
        return product;
    });
}

export default shoppingCart_getProductsData