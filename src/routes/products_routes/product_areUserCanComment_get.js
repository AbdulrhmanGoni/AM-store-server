import ProductsController from "../../controllers/products-controllers/ProductsController.js";

export default async function product_areUserCanComment_get(req, res) {
    try {
        const { productId } = req.params;
        const response = await ProductsController.areUserCanComment(productId, req.userId);
        res.status(200).json(response);
    } catch (err) {
        console.log(err)
        res.status(400).json();
    }
}
