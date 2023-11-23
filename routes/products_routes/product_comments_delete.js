import ProductsController from "../../controllers/products-controllers/ProductsController.js"


export default async function product_comments_delete(req, res) {
    try {
        const { productId } = req.params;
        const { commentId } = req.body;
        const response = await ProductsController.deleteCommentFromProduct(productId, commentId)
        res.status(response ? 200 : 400).json(response);
    } catch (error) {
        console.log(error)
        res.status(400).json()
    }
}
