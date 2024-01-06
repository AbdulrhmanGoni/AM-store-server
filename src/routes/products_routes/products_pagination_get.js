import ProductsController from '../../controllers/products-controllers/ProductsController.js'

export default async function products_pagination_get(req, res) {
    try {
        const products = await ProductsController.productsPagination(req.query);
        res.status(products ? 200 : 400).json(products);
    } catch (error) {
        console.log(error)
        res.status(500).json();
    }
}
