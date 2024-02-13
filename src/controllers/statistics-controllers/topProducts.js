import { productDataTypes } from "../../CONSTANT/projections.js";
import ProductsModel from "../../models/Products.js";

export default async function topProducts(limit = 5) {
    const projection = productDataTypes.summary;
    try {
        const [products] = await ProductsModel.aggregate([{
            $facet: {
                topSales: [
                    { $sort: { sold: -1 } },
                    { $limit: +limit },
                    { $project: { ...projection, "sold": 1 } }
                ],
                topEarnings: [
                    { $sort: { earnings: -1 } },
                    { $limit: +limit },
                    { $project: { ...projection, "earnings": 1 } }
                ]
            }
        }])
        return products
    } catch (error) {
        console.log(error)
        return null
    }
}