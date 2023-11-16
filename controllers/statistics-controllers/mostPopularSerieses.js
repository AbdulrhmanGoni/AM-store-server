import ProductsModel from "../../models/Products.js";


export default async function mostPopularSerieses(limit = 5) {
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
                        },
                        { $project: { series: "$_id", value: 1, _id: 0 } },
                        { $sort: { value: -1 } },
                        { $limit: +limit }
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
                        { $limit: +limit }
                    ]
                }
            }
        ])
        return products;
    } catch (error) {
        console.log(error)
        return null;
    }
}
