import { userDataTypes } from "../../CONSTANT/projections.js";
import UsersModel from "../../models/Users.js";


export default async function getPaymentMethods(userId) {
    try {
        const { userPaymentMethodes } = await UsersModel.findById(userId, userDataTypes.paymentMethodes);
        return userPaymentMethodes;
    } catch (error) {
        console.log(error);
        return null;
    }
}
