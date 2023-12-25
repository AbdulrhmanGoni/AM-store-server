import { Types } from "mongoose";
import { productDataTypes } from "../../CONSTANT/projections.js";
import UsersModel from "../../models/Users.js";
import productRatingPreparingStages from "../../utilities/productRatingPreparingStages.js";

export default async function loggedUser(userId) {
    try {
        const [initialUserData] = await UsersModel.aggregate([
            { $match: { _id: new Types.ObjectId(userId) } },
            {
                $project: {
                    userData: {
                        _id: "$_id",
                        userName: "$userName",
                        userEmail: "$userEmail",
                        avatar: "$avatar",
                        hisEmailVerified: "$hisEmailVerified"
                    },
                    favorites: "$userFavorites",
                    userShoppingCart: 1
                }
            },
            {
                $lookup: {
                    from: "products",
                    let: { userShoppingCart: "$userShoppingCart" },
                    as: "shoppingCart",
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $gt: [
                                        {
                                            $reduce: {
                                                input: "$$userShoppingCart",
                                                initialValue: 0,
                                                in: {
                                                    $sum: [
                                                        {
                                                            $cond: {
                                                                if: { $eq: [{ $substrBytes: ["$$this", 0, 24] }, { $toString: "$_id" }] },
                                                                then: 1,
                                                                else: 0
                                                            }
                                                        },
                                                        "$$value"
                                                    ]
                                                }
                                            }
                                        },
                                        0
                                    ]
                                }
                            }
                        },
                        { $project: productDataTypes.basic },
                        {
                            $set: {
                                count: {
                                    $reduce: {
                                        input: "$$userShoppingCart",
                                        initialValue: 0,
                                        in: {
                                            $sum: [
                                                {
                                                    $cond: {
                                                        if: { $eq: [{ $substrBytes: ["$$this", 0, 24] }, { $toString: "$_id" }] },
                                                        then: { $toDouble: { $substrBytes: ["$$this", 25, -1] } },
                                                        else: 0
                                                    }
                                                },
                                                "$$value"
                                            ]
                                        }
                                    }
                                },
                            }
                        },
                        ...productRatingPreparingStages()
                    ]
                }
            },
            { $project: { userShoppingCart: 0, _id: 0 } }
        ]);
        return initialUserData;
    } catch (error) {
        console.log(error)
        return null;
    }
}

