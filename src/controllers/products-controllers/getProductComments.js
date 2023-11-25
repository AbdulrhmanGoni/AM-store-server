import { Types } from "mongoose";
import ProductsCommentsModel from "../../models/ProductsComments.js";


export default async function getProductComments(productId, options) {

    try {
        const { sliceNumber, sliceSize } = options;
        const startSlice = sliceNumber * sliceSize;

        const results = await ProductsCommentsModel.aggregate([
            { $match: { productId: new Types.ObjectId(productId) } },
            { $unwind: '$comments' },
            { $replaceRoot: { newRoot: '$comments' } },
            { $skip: startSlice },
            { $limit: sliceSize + 1 },
            {
                $lookup: {
                    from: "users",
                    as: "commenterData",
                    localField: "commenterId",
                    foreignField: "_id",
                    pipeline: [{ $project: { userName: 1, avatar: 1, _id: 0 } }]
                }
            },
            { $set: { commenterData: { $first: "$commenterData" } } },
            { $project: { updatedAt: 0 } }
        ])

        return {
            thereIsMore: !!results[sliceSize],
            comments: results.slice(0, sliceSize)
        }
    } catch (error) {
        console.log(error)
        return null;
    }
}
