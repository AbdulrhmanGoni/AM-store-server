import FeedbacksModel from "../../models/Feedbacks.js";
import messageResponse from "../../utilities/messageResponse.js";

export default async function getUsersFeedback({ sliceNumber, sliceSize } = {}) {
    try {
        const limit = +sliceSize + 1
        const skip = sliceNumber * sliceSize
        const results = await FeedbacksModel.aggregate([
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userData",
                    pipeline: [{ $project: { userName: true, avatar: true, _id: false } }]
                }
            },
            {
                $project: {
                    userData: { $arrayElemAt: ["$userData", 0] },
                    subject: true,
                    body: true,
                    createdAt: true,
                }
            }
        ])
        return {
            status: 200,
            response: {
                thereIsMore: !!results[sliceSize],
                feedbacks: results.slice(0, sliceSize)
            }
        }
    } catch (error) {
        console.log(error)
        return messageResponse("Unexpected error !")
    }
}