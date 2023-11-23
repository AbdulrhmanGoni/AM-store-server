import ProductsCommentsModel from "../../models/ProductsComments.js"

export default async function likeProductComment({ productId, commentId, userId, undo }) {
    try {
        const filter = { productId, "comments.id": commentId }
        if (undo) {
            const res = await ProductsCommentsModel.updateOne(filter, { $pull: { "comments.$.likes": userId } })
            return !!res.modifiedCount;
        } else {
            const res = await ProductsCommentsModel.updateOne(filter, {
                $push: { "comments.$.likes": userId },
                $pull: { "comments.$.dislikes": userId },
            });
            return !!res.modifiedCount;
        }
    } catch (error) {
        console.log(error)
        return null;
    }
}