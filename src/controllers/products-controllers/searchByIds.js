import idHandler from "../../utilities/idHandler.js";
import ProductsModel from "../../models/Products.js";

export default async function searchByIds(productsIds, projection, options) {
    try {
        const { withCount, withPrice } = options;
        const ids = productsIds.map((product => idHandler(product).id))
        const products = await ProductsModel.find({ _id: { $in: ids } }, projection);
        if (withCount || withPrice) {
            const productsWith = products.map((product => {
                const { count, price } = idHandler(productsIds.find(item => idHandler(item).id === product.id));
                if (withCount) { product.count = count }
                if (withPrice) { product.price = price }
                return product;
            }))
            return productsWith;
        }
        else return products;
    } catch (error) {
        console.log(error)
        return null
    }
}
