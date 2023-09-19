import ProductsModel from "../models/Products.js";


export default async function mostPopularSerieses(req, res) {
    let limit = { $limit: +req.query.limit }
    try {
        const [products] = await ProductsModel.aggregate([
            {
                $facet: {
                    topSold: [
                        {
                            $group: {
                                _id: "$series",
                                value: { $sum: "$sold" },
                            }
                        }, { $sort: { value: -1 } }, limit
                    ],
                    topEarnings: [
                        {
                            $group: {
                                _id: "$series",
                                value: { $sum: "$earnings" }
                            }
                        }, { $sort: { value: -1 } }, limit
                    ],
                }
            }
        ])
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}
