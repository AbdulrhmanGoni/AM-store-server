import ProductsModel from "../../models/Products.js";


export default async function products_in_stock(req, res) {
    try {
        const inStock = await ProductsModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    inStock: { $sum: "$amount" }
                }
            }
        ])
        res.status(200).json(inStock);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}
