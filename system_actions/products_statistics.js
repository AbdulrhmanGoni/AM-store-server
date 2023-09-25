import ProductsModel from "../models/Products.js";

export default async function products_statistics(req, res) {
    try {
        const categories = await ProductsModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    productsCount: { $count: {} },
                    totalEarnings: { $sum: "$earnings" },
                    productsSold: { $sum: "$sold" },
                    inStock: { $sum: "$amount" }
                }
            }
        ])
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}