import UsersModel from "../../models/Users.js";
import { productDataTypes } from "../../CONSTANT/projections.js";
import productRatingPreparingStages from "../../utilities/productRatingPreparingStages.js";
import toObjectId from "../../utilities/toObjectId.js";


export default async function getShoppingCart(userId) {
    try {
        const [{ products }] = await UsersModel.aggregate([
            { $match: { _id: toObjectId(userId) } },
            {
                $lookup: {
                    from: "products",
                    as: "products",
                    let: {
                        productsInCart: {
                            $map: {
                                input: "$userShoppingCart",
                                as: "id",
                                in: {
                                    productId: { $substrBytes: ["$$id", 0, 24] },
                                    count: { $toDouble: { $substrBytes: ["$$id", 25, -1] } }
                                }
                            }
                        }
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $setIsSubset: [[{ $toString: "$_id" }], "$$productsInCart.productId"] }
                            }
                        },
                        {
                            $set: {
                                count: {
                                    $reduce: {
                                        input: "$$productsInCart",
                                        initialValue: 0,
                                        in: {
                                            $sum: [
                                                "$$value",
                                                {
                                                    $cond: {
                                                        if: { $eq: [{ $toString: "$_id" }, "$$this.productId"] },
                                                        then: "$$this.count",
                                                        else: 0,
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        { $project: productDataTypes.basic },
                        ...productRatingPreparingStages()
                    ]
                }
            },
            { $project: { products: 1 } }
        ])
        return products;
    } catch (error) {
        console.log(error);
        return null;
    }
}