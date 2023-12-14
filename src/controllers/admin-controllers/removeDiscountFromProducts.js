import ProductsModel from "../../models/Products.js";

export default async function removeDiscountFromProducts(productsIds) {
    try {
        const filter = { _id: { $in: productsIds } }
        const updateQuery = { $set: { discount: 0 } }
        const result = await ProductsModel.updateMany(filter, updateQuery);
        return !!result.modifiedCount;
    } catch (error) {
        console.log(error)
        return null
    }
}
