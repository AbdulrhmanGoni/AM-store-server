import ProductsController from '../../controllers/products-controllers/ProductsController.js'

export default async function products_length_get(_, res) {
    try {
        const length = await ProductsController.productsCount();
        res.status(200).json(length);
    } catch (error) {
        res.status(400).json();
    }
}
