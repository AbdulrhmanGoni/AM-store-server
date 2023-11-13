import UserModel from "../../../models/Users.js";
import { userDataTypes } from "../../../CONSTANT/projections.js";

const paymentMethods_get = async (req, res) => {
    try {
        const { userPaymentMethodes } = await UserModel.findById(req.params.userId, userDataTypes.paymentMethodes);
        res.status(200).json(userPaymentMethodes);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default paymentMethods_get;