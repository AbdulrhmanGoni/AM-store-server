import ProductsModel from "../../models/Products.js";


export default async function mostPopularSerieses(req, res) {
    let limit = { $limit: +req.query.limit }
    try {
        let [products] = await ProductsModel.aggregate([
            {
                $facet: {
                    topSold: [
                        {
                            $group: {
                                _id: "$series",
                                value: { $sum: "$sold" },
                            }
                        },
                        { $project: { series: "$_id", value: 1, _id: 0 } },
                        { $sort: { value: -1 } },
                        limit
                    ],
                    topEarnings: [
                        {
                            $group: {
                                _id: "$series",
                                value: { $sum: "$earnings" }
                            }
                        },
                        { $project: { series: "$_id", value: 1, _id: 0 } },
                        { $sort: { value: -1 } },
                        limit
                    ],
                    seriesesCount: [
                        { $group: { _id: "$series" } },
                        { $count: "count" }
                    ]
                }
            }
        ])
        products.seriesesCount = products.seriesesCount[0].count
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}
