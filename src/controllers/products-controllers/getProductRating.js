import { Types } from "mongoose";
import ProductsModel from "../../models/Products.js";

export default async function getProductRating(productId, userId) {
    try {
        productId = new Types.ObjectId(productId);
        userId = new Types.ObjectId(userId);

        const [result] = await ProductsModel.aggregate([
            { $match: { _id: productId } },
            { $unwind: "$ratings" },
            { $replaceRoot: { newRoot: "$ratings" } },
            {
                $group: {
                    _id: "product ratings",
                    reviews: { $count: {} },
                    usersRatings: { $sum: "$rating" },
                    oneStar: mongoQueryCondition("$rating", 1),
                    twoStars: mongoQueryCondition("$rating", 2),
                    threeStars: mongoQueryCondition("$rating", 3),
                    fuorStars: mongoQueryCondition("$rating", 4),
                    fiveStars: mongoQueryCondition("$rating", 5),
                    currentUserRateing: mongoQueryCondition("$raterId", userId, "$rating")
                }
            },
            {
                $project: {
                    ratingAverage: { $trunc: [{ $divide: ["$usersRatings", "$reviews"] }, 1] },
                    oneStar: mongoQueryPercentage("$oneStar"),
                    twoStars: mongoQueryPercentage("$twoStars"),
                    threeStars: mongoQueryPercentage("$threeStars"),
                    fuorStars: mongoQueryPercentage("$fuorStars"),
                    fiveStars: mongoQueryPercentage("$fiveStars"),
                    currentUserRateing: true,
                    reviews: true,
                    _id: false
                }
            }
        ])
        return result;
    } catch (error) {
        console.log(error)
        return null
    }
}

const mongoQueryCondition = (field, value, customSum) => {
    return {
        $sum: {
            $cond: {
                if: { $eq: [field, value] },
                then: customSum || 1,
                else: 0,
            }
        }
    }
}

const mongoQueryPercentage = (value) => {
    return {
        count: value,
        percentage: {
            $trunc: [
                {
                    $multiply: [
                        { $divide: [value, "$reviews"] },
                        100
                    ]
                },
                1
            ]
        }
    }
}