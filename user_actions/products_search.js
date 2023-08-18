import { productDataTypes } from "../CONSTANT/dataTypes.js";
import createProjection from "../functions/createProjection.js";
import searchForProducts from "../functions/searchForProducts.js";

const products_search = async (req, res) => {
    try {
        const products = await searchForProducts({
            queries: req.query,
            projection: productDataTypes[req.query.type ?? "basic"]
        });
        res.status(200).json(products);
    } catch {
        res.status(400).json(null);
    }
}

export default products_search;