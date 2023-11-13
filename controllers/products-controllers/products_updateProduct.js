import ProductsModel from "../../models/Products.js"

export default async function products_updateProduct(req, res) {

    const
        filter = { _id: req.body.productId },
        updateQuery = { $set: req.body.changes }

    try {
        const { matchedCount, modifiedCount } = await ProductsModel.updateOne(filter, updateQuery)
        res.status(200).json(matchedCount && modifiedCount);
    } catch (error) {
        res.status(400).json(null)
    }
}