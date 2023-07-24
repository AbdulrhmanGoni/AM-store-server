import idHandler from "../functions/idHandler.js";
import createCustomType from "../functions/createProjection.js";
import ProductsModule from "../models/Products.js";
import { productDataTypes } from "../CONSTANT/dataTypes.js";

const products_getByIds = async (req, res) => {
    const { productsIds, withCount, withPrice } = req.body;
    const { type, custom } = req.query;
    const returnType = custom ? createCustomType(custom) : productDataTypes[type ?? "basic"];
    try {
        const ids = productsIds.map((product => idHandler(product).id))
        const products = await ProductsModule.find({ _id: { $in: ids } }, returnType);
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
            res.status(200).json(productWith);
        } else {
            res.status(200).json(products);
        }
    } catch { res.status(400).json(null) }
}

export default products_getByIds;