import UsersController from "../../controllers/users-controllers/UsersController";


export default async function user_paymentMethods_get(req, res) {
    try {
        const { userPaymentMethodes } = await UsersController.getPaymentMethods(req.params.userId);
        res.status(200).json(userPaymentMethodes);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
