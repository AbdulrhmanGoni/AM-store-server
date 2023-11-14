import { userDataTypes } from "../../CONSTANT/projections";
import shortCutsPathesInDataBase from "../../CONSTANT/shortCutsPathesInDataBase";
import UserModel from "../../models/Users";

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
