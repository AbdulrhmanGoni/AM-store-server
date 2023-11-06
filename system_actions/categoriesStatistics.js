import ProductsModel from "../models/Products.js";

export default async function categoriesStatistics(req, res) {
    try {
        const categories = await ProductsModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    category: { $first: "$category" },
                    productsCount: { $count: {} },
                    totalEarnings: { $sum: "$earnings" },
                    productsSold: { $sum: "$sold" },
                    inStock: { $sum: "$amount" },
                    outOfStock: {
                        $sum: {
                            $cond: {
                                if: { $eq: ["$amount", 0] },
                                then: { $sum: 1 },
                                else: { $sum: 0 }
                            }
                        }
                    },
                    serieses: { $addToSet: "$series" }
                }
            }
        ])
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}