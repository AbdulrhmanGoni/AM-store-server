import { userDataTypes } from "../../CONSTANT/projections";
import UserModel from "../../models/Users";


export default async function getPaymentMethods(userId) {
    try {
        const { userPaymentMethodes } = await UserModel.findById(userId, userDataTypes.paymentMethodes);
        return userPaymentMethodes;
    } catch (error) {
        console.log(error);
        return null;
    }
}
