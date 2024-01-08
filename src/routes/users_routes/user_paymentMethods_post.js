import UsersController from '../../controllers/users-controllers/UsersController.js';
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function user_paymentMethods_post(req, res) {
        const { theCard, type } = req.body;
        if (type === "choosedMethod") {
            const respond = await UsersController.setChoosedPaymentMethod(req.userId, theCard);
            res.status(respond ? 200 : 400).json(respond);
        } else {
            const respond = await UsersController.addPaymentMethod(req.userId, theCard);
            res.status(respond ? 200 : 400).json(respond);
        }
    }
)