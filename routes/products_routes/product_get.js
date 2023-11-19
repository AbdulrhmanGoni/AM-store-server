import ProductsController from '../../controllers/products-controllers/ProductsController.js'

export default async function product_get(req, res) {
    try {
        const response = await ProductsController.getProductById(req.params.productId, req.query);
        response && res.status(200).json(response);
        response == null && res.status(404).json();
        response == false && res.status(400).json();
    } catch (error) {
        console.log(error)
        res.status(400).json();
    }
}