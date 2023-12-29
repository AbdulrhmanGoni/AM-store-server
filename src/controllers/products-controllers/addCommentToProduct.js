import ProductsCommentsModel from "../../models/ProductsComments.js";
import crypto from "crypto";

export default async function addCommentToProduct(productId, theComment) {
    try {
        const commentId = crypto.randomUUID();
        theComment.id = commentId;
        const { modifiedCount, matchedCount } = await ProductsCommentsModel.updateOne(
            { productId },
            { $push: { comments: theComment } }
        );
        if (!matchedCount && !modifiedCount) {
            const newProductsCommentsDoc = new ProductsCommentsModel({ productId, comments: [theComment] });
            const response = await newProductsCommentsDoc.save()
            return response ? commentId : false;
        }
        return modifiedCount ? commentId : false;
    } catch (error) {
        console.log(error)
        return null;
    }
}
