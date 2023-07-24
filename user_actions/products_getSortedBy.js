import ProductsModel from "../models/Products.js";

async function products_getSortedBy({ sortBy, projection, limit }) {
    try {
        return await ProductsModel.find(
            {},
            { ...projection, [sortBy]: true },
            { limit, sort: { [sortBy]: -1 } }
        );
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default products_getSortedBy