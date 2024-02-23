import { productDataTypes } from "../../CONSTANT/projections.js";
import ProductsModel from "../../models/Products.js"

export default async function getTopProducts(limit = 10) {
    try {
        return await ProductsModel
            .find({}, productDataTypes.basic)
            .sort({ sold: -1, earnings: -1 })
            .limit(limit)

    } catch (error) {
        console.log(error)
        return null;
    }
}
