import UsersController from "../../controllers/users-controllers/UsersController";

export default async function user_paymentMethods_post(req, res) {
    try {
        const { theCard, type } = req.body;
        if (type === "choosedMethod") {
            const respond = await UsersController.setChoosedPaymentMethod(userId, theCard);
            res.status(200).json(respond);
        } else {
            const respond = await UsersController.addPaymentMethod(userId, theCard);
            res.status(201).json(respond);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}