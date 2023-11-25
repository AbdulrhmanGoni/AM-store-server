import ProductsModel from "../../models/Products.js";


export default async function productsStatistics() {
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
        return productsStatistics;
    } catch (error) {
        return null;
    }
}