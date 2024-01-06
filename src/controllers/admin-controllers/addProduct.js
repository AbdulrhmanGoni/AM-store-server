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
        const response = await newProduct.save()
            .then(() => true)
            .catch((error) => {
                console.log(error)
                return false
            })

        return response;
    } catch (error) {
        console.log(error)
        return null;
    }
}