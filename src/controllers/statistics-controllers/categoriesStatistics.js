import ProductsModel from "../../models/Products.js";

export default async function categoriesStatistics() {
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
        return categories;
    } catch (error) {
        return null;
    }
}