import { userDataTypes } from "../../CONSTANT/projections.js";
import shortCutsPathesInDataBase from "../../CONSTANT/shortCutsPathesInDataBase.js";
import UserModel from "../../models/Users.js";

export default async function addPaymentMethod(userId, theCard) {
    const { cardsListPath, choosedMethodPath } = shortCutsPathesInDataBase.paymentMethodesPathes;
    try {
        return await UserModel.findByIdAndUpdate(
            userId,
            {
                $push: { [cardsListPath]: theCard },
                $set: { [choosedMethodPath]: theCard }
            },
            { new: true, projection: userDataTypes.paymentMethodes }
        );
    }
    catch (error) {
        return null
    }
}
