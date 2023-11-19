import UsersController from '../../controllers/users-controllers/UsersController.js';

export default async function user_paymentMethods_get(req, res) {
    try {
        const userPaymentMethodes = await UsersController.getPaymentMethods(req.userId);
        res.status(userPaymentMethodes ? 200 : 400).json(userPaymentMethodes);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
