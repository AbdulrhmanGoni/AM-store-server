import ProductsModel from "../../models/Products";

export default async function productsInStock() {
    try {
        const inStock = await ProductsModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    inStock: { $sum: "$amount" }
                }
            }
        ])
        return inStock;
    } catch (error) {
        console.log(error)
        return null;
    }
}
