import { productDataTypes } from "../../CONSTANT/projections.js";
import createProjection from "../../utilities/createProjection.js";
import OrdersModel from "../../models/Orders.js";
import productRatingPreparingStages from "../../utilities/productRatingPreparingStages.js";
import toObjectId from "../../utilities/toObjectId.js";

export default async function getOrders({ orderId, userId }, query = {}) {

    const {
        productsReturnType: type,
        ordersReturnType,
        state,
        sliceNumber,
        sliceSize
    } = query;

    const thereIsPaginationOptions = !!(sliceSize && sliceNumber);
    const productsProjection = type ? productDataTypes[type] ?? createProjection(type) : productDataTypes.basic;
    const ordersProjection = ordersReturnType ? createProjection(ordersReturnType) : { __v: 0 };
    const filter = {};

    orderId && Object.assign(filter, { _id: toObjectId(orderId) });
    userId && Object.assign(filter, { userId: toObjectId(userId) });
    state && Object.assign(filter, { state });

    const pipeline = [
        { $match: filter },
        { $sort: { createdAt: -1 } }
    ];

    if (thereIsPaginationOptions) {
        pipeline.push(
            { $skip: ((+sliceNumber) - 1) * +sliceSize },
            { $limit: +sliceSize + 1 }
        )
    }

    pipeline.push(
        {
            $lookup: {
                from: "products",
                as: "products",
                let: { products: "$products" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $gt: [
                                    {
                                        $reduce: {
                                            input: "$$products",
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
                    { $project: productsProjection },
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
                                                        $toDouble: {
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
                    ...productRatingPreparingStages()
                ]
            }
        },
        { $project: ordersProjection }
    )

    try {
        const orders = await OrdersModel.aggregate(pipeline)
        if (thereIsPaginationOptions) {
            return {
                thereIsMore: !!orders[sliceSize],
                orders: orders.slice(0, sliceSize)
            }
        }
        else return orders
    } catch (err) {
        console.log(err)
        return null;
    }
}
