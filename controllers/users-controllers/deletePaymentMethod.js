import { userDataTypes } from "../../CONSTANT/projections.js";
import shortCutsPathesInDataBase from "../../CONSTANT/shortCutsPathesInDataBase.js";
import UserModel from "../../models/Users.js";


export default async function deletePaymentMethod(userId, cardNumber) {
    try {
        const { cardsListPath, choosedMethodPath } = shortCutsPathesInDataBase.paymentMethodesPathes;
        const response = await UserModel.findByIdAndUpdate(userId,
            { $pull: { [cardsListPath]: { number: cardNumber } } },
            { new: true, projection: userDataTypes.paymentMethodes }
        );

        if (response.userPaymentMethodes.choosedMethod) {
            if (response.userPaymentMethodes.choosedMethod.number === cardNumber) {
                const response = await UserModel.findByIdAndUpdate({ _id: userId },
                    { $set: { [choosedMethodPath]: null } },
                    { new: true, projection: userDataTypes.paymentMethodes }
                );
                return response;
            }
        }
        return response;
    } catch (error) {
        console.log(error)
        return null
    }
}
