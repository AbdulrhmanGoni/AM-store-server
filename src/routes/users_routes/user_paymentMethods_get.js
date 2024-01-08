import UsersController from '../../controllers/users-controllers/UsersController.js';
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function user_paymentMethods_get(req, res) {
        const userPaymentMethodes = await UsersController.getPaymentMethods(req.userId);
        res.status(userPaymentMethodes ? 200 : 400).json(userPaymentMethodes);
    }
)