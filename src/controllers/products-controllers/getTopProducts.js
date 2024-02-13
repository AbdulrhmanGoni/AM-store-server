import ProductsModel from "../../models/Products.js"

export default async function getTopProducts(basedOn, limit = 10) {
    try {
        return await ProductsModel
            .find({}, {}, { limit })
            .sort({ [basedOn]: -1 })
            .limit(limit)

    } catch (error) {
        console.log(error)
        return null;
    }
}
