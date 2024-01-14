import ProductsModel from "../../models/Products.js";
import toObjectId from "../../utilities/toObjectId.js";

export default async function getProductRating(productId, userId) {
    try {
        productId = toObjectId(productId);
        userId = userId?.length === 24 ? toObjectId(userId) : userId;

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
        if (result) {
            return result;
        } else {
            return {
                reviews: 0,
                oneStar: { count: 0, percentage: 0 },
                twoStars: { count: 0, percentage: 0 },
                threeStars: { count: 0, percentage: 0 },
                fuorStars: { count: 0, percentage: 0 },
                fiveStars: { count: 0, percentage: 0 },
                currentUserRateing: 0,
                ratingAverage: 0
            }
        }
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