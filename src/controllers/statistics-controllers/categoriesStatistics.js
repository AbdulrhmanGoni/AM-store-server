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
            },
            { $unset: ["_id"] }
        ])
        return categories;
    } catch (error) {
        console.log(error)
        return null;
    }
}