import { productDataTypes } from "../CONSTANT/projections.js";
import searchForProducts from "../functions/searchForProducts.js";

const products_search = async (req, res) => {
    try {
        const products = await searchForProducts({
            queries: req.query,
            projection: productDataTypes[req.query.type ?? "basic"]
        });
        !!products.length && res.status(200).json(products);
        !products.length && res.status(404).json([]);
    } catch {
        res.status(400).json(null);
    }
}

export default products_search;