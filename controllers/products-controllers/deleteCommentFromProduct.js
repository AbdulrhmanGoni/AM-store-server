import ProductsCommentsModel from "../../models/ProductsComments.js";


export default async function deleteCommentFromProduct(productId, commentId) {
    try {
        const res = await ProductsCommentsModel.updateOne({ productId }, { $pull: { comments: { id: commentId } } });
        return !!res.modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }
}
