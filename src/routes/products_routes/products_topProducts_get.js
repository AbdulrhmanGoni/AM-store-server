import ProductsController from "../../controllers/products-controllers/ProductsController.js";

export default async function products_topProducts_get(req, res) {
    try {
        const { sort, limit } = req.query;
        const result = await ProductsController.getTopProducts(sort, limit);
        res.status(result ? 200 : 400).json(result)
    } catch (error) {
        res.status(400).json();
    }
}
