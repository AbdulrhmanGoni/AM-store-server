import { productDataTypes } from "../../CONSTANT/projections.js";
import ProductsModel from "../../models/Products.js";
import products_getSortedBy from "../../user_actions/products_getSortedBy.js";

const projection = productDataTypes.summary;

async function products_topProducts(req, res) {
    let limit = { $limit: +req.query.limit ?? 5 };
    try {
        const [products] = await ProductsModel.aggregate([{
            $facet: {
                topSales: [
                    { $sort: { sold: -1 } }, limit,
                    { $project: { ...projection, "sold": 1 } }
                ],
                topEarnings: [
                    { $sort: { earnings: -1 } }, limit,
                    { $project: { ...projection, "earnings": 1 } }
                ]
            }
        }])
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}

export default products_topProducts;