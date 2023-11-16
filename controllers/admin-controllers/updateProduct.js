import ProductsModel from "../../models/Products.js";


export default async function updateProduct(productId, changes) {
    try {
        const { modifiedCount } = await ProductsModel.updateOne({ _id: productId }, { $set: changes });
        return !!modifiedCount;
    } catch (error) {
        console.log(error);
        return null;
    }
}
