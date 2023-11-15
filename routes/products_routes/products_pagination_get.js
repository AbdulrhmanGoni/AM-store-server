import ProductsController from '../../controllers/products-controllers/ProductsController'

export default async function products_pagination_get(req, res) {
    try {
        const products = await ProductsController.productsPagination(req.query);
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(400).json();
    }
}
