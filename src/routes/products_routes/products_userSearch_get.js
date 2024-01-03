import { productDataTypes } from "../../CONSTANT/projections.js";
import ProductsController from "../../controllers/products-controllers/ProductsController.js";


export default async function products_userSearch_get(req, res) {
    try {
        const products = await ProductsController.search({
            queries: req.query,
            projection: productDataTypes[req.query.type ?? "basic"]
        });
        if (products) {
            if (products.length) res.status(200).json(products);
            else res.status(404).json([]);
        } else res.status(400).json();
    } catch (err) {
        console.log(err);
        res.status(400).json();
    }
}