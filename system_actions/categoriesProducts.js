import ProductsModel from "./models/Products.js";

export default async function categoriesProducts(req, res) {
    try {
        const categories = await ProductsModel.aggregate([
            { $group: { _id: "$category", count: { $count: {} } } }
        ])
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}