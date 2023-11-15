import idHandler from "../../functions/idHandler";
import ProductsModel from "../../models/Products";

export default async function searchByIds(productsIds, projection, options) {
    try {
        const { withCount, withPrice } = options;
        const ids = productsIds.map((product => idHandler(product).id))
        const products = await ProductsModel.find({ _id: { $in: ids } }, projection);
        if (withCount || withPrice) {
            const productWith = products.map((product => {
                if (withCount) {
                    product.count = idHandler(productsIds.find(item => idHandler(item).id === product.id)).count
                }
                if (withPrice) {
                    product.price = idHandler(productsIds.find(item => idHandler(item).id === product.id)).price
                }
                return product;
            }))
            return productWith;
        } else {
            return products;
        }
    } catch (error) {
        console.log(error)
        return null
    }
}
