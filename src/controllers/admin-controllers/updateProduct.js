import ProductsModel from "../../models/Products.js";

/**
* Updates a product in the database.
* 
* @param { string } productId - The id of the product to update.
* @param { { [string]: any } } changes - The changes to apply to the product. 
* is an object `keys` = the filed to update, `values` = the new value of the filed
* 
* @return { Promise<boolean | null> } `true` if the product was updated successfully, else `false`.
* if an unexpected error happend `null` will returned.
*/
export default async function updateProduct(productId, changes) {
    try {
        const { modifiedCount } = await ProductsModel.updateOne({ _id: productId }, { $set: changes });
        return !!modifiedCount;
    } catch (error) {
        console.log(error);
        return null;
    }
}
