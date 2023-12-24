import ProductsController from "../../controllers/products-controllers/ProductsController.js"

export default async function product_getProductRating_get(req, res) {
    try {
        const { productId } = req.params;
        const { userId } = req.query;
        const response = await ProductsController.getProductRating(productId, userId);
        res.status(response === null ? 400 : 200).json(response);
    } catch (error) {
        console.log(error)
        res.status(400).json();
    }
}
