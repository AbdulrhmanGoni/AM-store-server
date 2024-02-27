import ProductsModel from "../../models/Products.js";

export default async function productsStatistics() {
    try {
        const result = await ProductsModel.aggregate([
            {
                $group: {
                    _id: "products",
                    totalProducts: { $count: {} },
                    totalProductsSold: { $sum: "$sold" },
                    totalInStock: { $sum: "$amount" },
                    productsOutOfStock: {
                        $sum: {
                            $cond: {
                                if: { $eq: ["$amount", 0] },
                                then: { $sum: 1 },
                                else: { $sum: 0 }
                            }
                        }
                    },
                    categories: { $addToSet: "$category" },
                    series: { $addToSet: "$series" }
                }
            },
            {
                $set: {
                    categoriesCount: { $size: "$categories" },
                    seriesCount: { $size: "$series" }
                }
            },
            { $unset: ["_id", "categories", "series"] }
        ])
        return result[0] || {}
    } catch (error) {
        return null;
    }
}