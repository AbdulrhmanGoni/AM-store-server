import UsersController from '../../controllers/users-controllers/UsersController.js';
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function user_paymentMethods_delete(req, res) {
        const respond = await UsersController.deletePaymentMethod(req.userId, req.body.cardNumber);
        res.status(respond ? 200 : 400).json(respond);
    }
)