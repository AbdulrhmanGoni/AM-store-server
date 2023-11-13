import ProductsModel from "../../models/Products.js";


export default async function productsStatistics(req, res) {
    try {
        const [productsStatistics] = await ProductsModel.aggregate([
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
                    serieses: { $addToSet: "$series" }
                }
            },
            {
                $set: {
                    categoriesCount: { $size: "$categories" },
                    seriesesCount: { $size: "$serieses" }
                }
            }
        ])
        res.status(200).json(productsStatistics);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}