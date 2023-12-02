import ProductsController from "../../controllers/products-controllers/ProductsController.js"

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
                const { commentId, userId, actionType, undo } = req.body;
                switch (actionType) {
                    case "like": {
                        const response = await likeProductComment({ productId, commentId, userId, undo });
                        return res.status(response ? 200 : 400).json(response);
                    }

                    case "dislike": {
                        const response = await disLikeProductComment({ productId, commentId, userId, undo });
                        return res.status(response ? 200 : 400).json(response);
                    }

                    default: return res.status(405).json(null);
                }
            }

            default: return res.status(405).json(null);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
}
