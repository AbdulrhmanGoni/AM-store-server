import ProductsModel from "../../models/Products.js";

export default async function categoriesStatistics(_, res) {
    try {
        const categories = await ProductsModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    category: { $first: "$category" },
                    productsCount: { $count: {} },
                    totalEarnings: { $sum: "$earnings" },
                    productsSold: { $sum: "$sold" }
                }
            }
        ])
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}