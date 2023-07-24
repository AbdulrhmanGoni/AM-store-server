import { productDataTypes } from "../CONSTANT/dataTypes.js";
import products_getSortedBy from "../user_actions/products_getSortedBy.js";

async function products_topEarnings(req, res) {
    try {
        const products = await products_getSortedBy({
            sortBy: "earnings",
            projection: productDataTypes.summary,
            limit: +req.query.limit
        })
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json(null);
    }
}

export default products_topEarnings