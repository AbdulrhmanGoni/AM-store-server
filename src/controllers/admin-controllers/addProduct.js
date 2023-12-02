import ProductsModel from "../../models/Products.js";

/**
* Adds a product to the database by creating an instance of `ProductsModel` and saving it to the database.
* 
* @param theProducts - The Products to add.
* 
* @return { Promise<boolean | null> } `true` if the product was added successfully, `false` if adding failed, 
* `null` if an unexpected error occurred.
*/
export default async function addProduct(theProducts) {
    try {
        const newProduct = new ProductsModel(theProducts);
        let addedSuccessfully = false
        await newProduct.save().then(() => { addedSuccessfully = true })
        return addedSuccessfully;
    } catch (error) {
        console.log(error)
        return null;
    }
}