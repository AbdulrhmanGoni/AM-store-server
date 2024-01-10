import ProductsController from "../../controllers/products-controllers/ProductsController.js"
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";
import toObjectId from "../../utilities/toObjectId.js";

export default asyncRouteHandler(
    async function product_comments_post(req, res) {

        const { likeProductComment, disLikeProductComment } = ProductsController;
        const { productId } = req.params;
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
        }
    }
)