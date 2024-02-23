import UsersModel from "../../models/Users.js";


export default async function getPaymentMethods(userId) {
    try {
        const projection = { userPaymentMethodes: 1, _id: 0 }
        const { userPaymentMethodes } = await UsersModel.findById(userId, projection);
        return userPaymentMethodes;
    } catch (error) {
        console.log(error);
        return null;
    }
}
