import ProductsModel from "../../models/Products.js";

export default async function addProduct(theProducts) {
    try {
        const newProduct = new ProductsModel(theProducts);
        let addedSuccessfully = false
        await newProduct.save().then(() => { addedSuccessfully = true })
        return addedSuccessfully;
    } catch (error) {
        console.log(error)
        return null
    }
}