import { Types } from "mongoose";
import { productDataTypes } from "../CONSTANT/projections.js";
import createProjection from "../functions/createProjection.js";
import OrdersModel from "../models/Orders.js";

export default async function getOrders({ orderId, userId }, query = {}) {

    const { productsReturnType: type, ordersReturnType, state } = query;
    const productsProjection = type ? productDataTypes[type] ?? createProjection(type) : productDataTypes.basic
    const ordersProjection = ordersReturnType ? createProjection(ordersReturnType) : { __v: 0 }
    const filter = {}

    orderId && Object.assign(filter, { _id: new Types.ObjectId(orderId) })
    userId && Object.assign(filter, { userId: new Types.ObjectId(userId) })
    state && Object.assign(filter, { state })

    try {
        const orders = await OrdersModel.aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: "products",
                    as: "products",
                    let: { products: "$products" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [
                                        { $toString: "$_id" },
                                        {
                                            $map: {
                                                input: "$$products",
                                                as: "productId",
                                                in: { $substr: ["$$productId", 0, 24] }
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            $addFields: {
                                count: {
                                    $reduce: {
                                        input: "$$products",
                                        initialValue: 0,
                                        in: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        { $substr: ["$$this", 0, 24] },
                                                        { $toString: "$_id" }
                                                    ]
                                                },
                                                then: {
                                                    $sum: [
                                                        "$$value",
                                                        {
                                                            $toInt: {
                                                                $arrayElemAt: [{ $split: ["$$this", "-"] }, 1]
                                                            }
                                                        }
                                                    ]
                                                },
                                                else: { $sum: ["$$value", 0] }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        { $project: productsProjection }
                    ]
                }
            },
            { $project: ordersProjection },
        ]).sort({ "createdAt": -1 })
        return orders;
    } catch (err) {
        console.log(err)
        return null;
    }
}
