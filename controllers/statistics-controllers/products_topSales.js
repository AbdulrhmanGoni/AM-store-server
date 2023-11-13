import { productDataTypes } from "../CONSTANT/dataTypes.js";
import products_getSortedBy from "../../user_actions/products_getSortedBy.js";

async function products_topSales(req, res) {
    try {
        const products = await products_getSortedBy({
            sortBy: "sold",
            projection: productDataTypes.summary,
            limit: +req.query.limit
        })
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json(null);
    }
}

export default products_topSales