import ProductsModel from "../../models/Products.js";

export default async function addProduct(theProducts) {
    try {
        const newProduct = new ProductsModel(theProducts);
        const { isNew } = await newProduct.save();
        return isNew;
    } catch (error) {
        return null
    }
}