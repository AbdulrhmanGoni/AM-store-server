import UsersController from "../../controllers/users-controllers/UsersController";


export default async function user_paymentMethods_delete(req, res) {
    try {
        const response = await UsersController.deletePaymentMethod(req.params.userId, req.body.cardNumber);
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
