import { Types } from "mongoose";
import OrdersModel from "../../models/Orders.js";


export default async function areUserCanComment(productId, userId) {
    try {
        const result = await OrdersModel.aggregate([
            {
                $match: {
                    $and: [
                        { userId: new Types.ObjectId(userId) },
                        {
                            $expr: {
                                $reduce: {
                                    input: "$products",
                                    initialValue: 0,
                                    in: {
                                        $cond: {
                                            if: { $eq: [{ $substrBytes: ["$$this", 0, 24] }, productId] },
                                            then: 1,
                                            else: 0
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            },
            { $limit: 1 },
            { $project: { _id: 1 } }
        ])
        return !!result.length;
    } catch (err) {
        console.log(err)
        return false;
    }
}
