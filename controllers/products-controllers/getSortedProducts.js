import ProductsModel from "../../models/Products.js";

export default async function getSortedProducts({ sortBy, projection, limit }) {
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