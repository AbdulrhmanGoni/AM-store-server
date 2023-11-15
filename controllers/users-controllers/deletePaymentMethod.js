import { userDataTypes } from "../../CONSTANT/projections.js";
import shortCutsPathesInDataBase from "../../CONSTANT/shortCutsPathesInDataBase.js";
import UserModel from "../../models/Users.js";


export default async function deletePaymentMethod(userId, cardNumber) {
    try {
        const { cardsListPath, choosedMethodPath } = shortCutsPathesInDataBase.paymentMethodesPathes;
        const response = await UserModel.findByIdAndUpdate(userId,
            { $pull: { [cardsListPath]: { number: cardNumber } } }
        );

        if (response.userPaymentMethodes.choosedMethod) {
            if (response.userPaymentMethodes.choosedMethod.number === cardNumber) {
                await UserModel.findByIdAndUpdate({ _id: userId },
                    { $set: { [choosedMethodPath]: null } }
                );
            }
        }
        return true;
    } catch (error) {
        console.log(error)
        return null
    }
}
