import UsersController from '../../controllers/users-controllers/UsersController.js';

export default async function user_paymentMethods_delete(req, res) {
    try {
        const respond = await UsersController.deletePaymentMethod(req.userId, req.body.cardNumber);
        res.status(respond ? 200 : 400).json(respond);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
