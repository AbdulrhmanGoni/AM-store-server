import UserModel from "../../models/Users.js";
import { productDataTypes } from "../../CONSTANT/projections.js";


export default async function getShoppingCart(userId) {
    try {
        const [{ products }] = await UserModel.aggregate([
            { $match: { _id: new Types.ObjectId(userId) } },
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
                                    count: { $toInt: { $substrBytes: ["$$id", 25, -1] } }
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
                        { $project: productDataTypes.basic }
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