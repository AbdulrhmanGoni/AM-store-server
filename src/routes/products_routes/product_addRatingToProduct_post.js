import ProductsController from "../../controllers/products-controllers/ProductsController.js"

export default async function product_addRatingToProduct_post(req, res) {
    try {
        const { productId } = req.params;
        const { userId, rate } = req.body;
        const response = await ProductsController.addRatingToProduct(productId, userId, rate);
        res.status(response ? 200 : 400).json(response);
    } catch (error) {
        console.log(error)
        res.status(400).json();
    }
}
