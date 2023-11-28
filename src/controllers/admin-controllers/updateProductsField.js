import ProductsModel from "../../models/Products.js";

export default async function updateProductsField(productId, { field, newValue }) {
    try {
        const { modifiedCount } = await ProductsModel.updateOne({ _id: productId }, { $set: { [field]: newValue } });
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return false;
    }
}