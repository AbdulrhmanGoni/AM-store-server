import ProductsModel from "../../models/Products.js";

export default async function addDiscountToProducts(productsIds, discount) {
    try {
        const filter = { _id: { $in: productsIds } }
        const updateQuery = { discount }
        const result = await ProductsModel.updateMany(filter, updateQuery);
        return !!result.modifiedCount;
    } catch (error) {
        console.log(error)
        return null
    }
}
