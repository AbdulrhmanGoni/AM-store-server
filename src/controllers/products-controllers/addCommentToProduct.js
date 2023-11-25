import ProductsCommentsModel from "../../models/ProductsComments.js";
import { v4 as uuidv4 } from 'uuid';

export default async function addCommentToProduct(productId, theComment) {
    try {
        const commentId = uuidv4();
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
