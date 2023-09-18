import ProductsModel from "./models/Products.js";


export default async function mostPopularSerieses(req, res) {
    try {
        const inStock = await ProductsModel.aggregate([
            {
                $group: {
                    _id: "$series",
                    productsSold: { $sum: "$sold" },
                    productsEarnings: { $sum: "$earnings" }
                }
            }
        ])
        res.status(200).json(inStock);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}
