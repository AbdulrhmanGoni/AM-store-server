import ProductsController from '../../controllers/products-controllers/ProductsController.js'

export default async function products_inStock_get(_, res) {
    try {
        const inStock = await ProductsController.productsInStock();
        res.status(200).json(inStock);
    } catch (error) {
        res.status(400).json();
    }
}