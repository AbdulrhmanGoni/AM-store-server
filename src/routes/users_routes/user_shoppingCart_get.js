import UsersController from "../../controllers/users-controllers/UsersController.js";


export default async function user_shoppingCart_get(req, res) {
    try {
        const products = await UsersController.getShoppingCart(req.userId);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}