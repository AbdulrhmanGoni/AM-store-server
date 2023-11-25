import UsersController from '../../controllers/users-controllers/UsersController.js';

export default async function user_shoppingCart_delete(req, res) {

    const { clearShoppingCart, removeFromShoppingCart } = UsersController;

    try {
        const { productId, type } = req.body;
        if (type === "clear") {
            const respons = await clearShoppingCart(req.params.userId);
            res.status(200).json(respons);
        } else {
            const respons = await removeFromShoppingCart(req.params.userId, productId);
            res.status(200).json(respons);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
