import ProductsModule from "../../models/Products.js";

export default async function deleteProducts(...productsIds) {
    try {
        const { deletedCount } = await ProductsModule.deleteOne({ _id: { $in: productsIds } });
        return !!deletedCount;
    } catch {
        return null;
    }
}