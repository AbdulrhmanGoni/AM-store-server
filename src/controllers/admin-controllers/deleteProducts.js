import ProductsModel from "../../models/Products.js";

/**
* Deletes products from the database, 
* each product its id found in the given array will deleted.
*
* @param { string[] } productsIds - an array of products identifiers (products to delete).
* 
* @return { Promise<boolean | null> } `true` if the products deleted successfully, else `false`. 
* if an unexpected Error happened `null` will returned.
*/
export default async function deleteProducts(productsIds) {
    try {
        const { deletedCount } = await ProductsModel.deleteMany({ _id: { $in: productsIds } });
        return !!deletedCount;
    } catch {
        return null;
    }
}