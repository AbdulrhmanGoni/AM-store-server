import { Types } from "mongoose";
import { productDataTypes } from "../CONSTANT/projections.js";
import UserModel from "../models/Users.js";

export default async function user_Logged(req, res) {
    try {
        const [initialUserData] = await UserModel.aggregate([
            { $match: { _id: new Types.ObjectId(req.params.userId) } },
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
                                                        then: { $toInt: { $substrBytes: ["$$this", 25, -1] } },
                                                        else: 0
                                                    }
                                                },
                                                "$$value"
                                            ]
                                        }
                                    }
                                },
                            }
                        }
                    ]
                }
            },
            { $project: { userShoppingCart: 0, _id: 0 } }
        ]);
        res.status(200).json(initialUserData);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

