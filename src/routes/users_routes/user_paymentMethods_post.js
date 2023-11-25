import UsersController from '../../controllers/users-controllers/UsersController.js';

export default async function user_paymentMethods_post(req, res) {
    try {
        const { theCard, type } = req.body;
        if (type === "choosedMethod") {
            const respond = await UsersController.setChoosedPaymentMethod(req.userId, theCard);
            res.status(respond ? 200 : 400).json(respond);
        } else {
            const respond = await UsersController.addPaymentMethod(req.userId, theCard);
            res.status(respond ? 200 : 400).json(respond);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}