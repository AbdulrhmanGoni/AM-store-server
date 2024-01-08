import UsersController from "../../controllers/users-controllers/UsersController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_shoppingCart_post(req, res) {

        const { setShoppingCart, addToShoppingCart } = UsersController;

        switch (req.body.type) {
            case "add_Item": {
                const response = await addToShoppingCart(req.userId, req.body);
                res.status(response ? 200 : 400).json(response);
                break;
            }

            case "set_new_cart": {
                const response = await setShoppingCart(req.userId, req.body.productsIds);
                res.status(response ? 200 : 400).json(response);
                break;
            }

            default:
                res.status(400).json({ error: type + "is an invalid type, use 'add_Item' or 'set_new_cart' instead" });
                break;
        }
    }
)
