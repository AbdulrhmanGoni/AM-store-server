import ProductsController from "../../controllers/products-controllers/ProductsController.js"
import toObjectId from "../../utilities/toObjectId.js";

export default async function product_comments_post(req, res) {
    try {
        const {
            addCommentToProduct,
            likeProductComment,
            disLikeProductComment
        } = ProductsController;
        const { productId } = req.params;

        switch (req.query.type) {
            case "newComment": {
                const response = await addCommentToProduct(productId, req.body.comment);
                return res.status(response ? 200 : 400).json(response);
            }

            case "like-dislike": {
                const { commentId, actionType, undo } = req.body;
                const userId = toObjectId(req.body.userId);
                const actionDetails = { productId, commentId, userId, undo }
                switch (actionType) {
                    case "like": {
                        const response = await likeProductComment(actionDetails);
                        return res.status(response ? 200 : 400).json(response);
                    }

                    case "dislike": {
                        const response = await disLikeProductComment(actionDetails);
                        return res.status(response ? 200 : 400).json(response);
                    }

                    default: return res.status(405).json(null);
                }
            }

            default: return res.status(405).json(null);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
}
