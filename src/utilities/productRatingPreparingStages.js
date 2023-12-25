
export default function productRatingPreparingStages() {
    return [
        {
            $addFields: {
                rating: {
                    $reduce: {
                        input: "$ratings",
                        initialValue: { reviews: 0, totalUsersRatings: 0, ratingAverage: 0 },
                        in: {
                            reviews: { $add: ["$$value.reviews", 1] },
                            totalUsersRatings: { $add: ["$$this.rating", "$$value.totalUsersRatings"] },
                            ratingAverage: {
                                $divide: [
                                    { $add: ["$$this.rating", "$$value.totalUsersRatings"] },
                                    { $add: ["$$value.reviews", 1] }
                                ]
                            }
                        }
                    }
                }
            }
        },
        {
            $project: {
                ratings: 0,
                rating: {
                    totalUsersRatings: 0
                }
            }
        }
    ]
}
