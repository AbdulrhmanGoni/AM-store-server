import shortCutsPathesInDataBase from "../../CONSTANT/shortCutsPathesInDataBase.js";
import UsersModel from "../../models/Users.js";

export default async function addPaymentMethod(userId, theCard) {
    const { cardsListPath, choosedMethodPath } = shortCutsPathesInDataBase.paymentMethodesPathes;
    try {
        const { modifiedCount } = await UsersModel.updateOne(
            { _id: userId },
            {
                $push: { [cardsListPath]: { $each: [theCard], $position: 0 } },
                $set: { [choosedMethodPath]: theCard }
            }
        );
        return !!modifiedCount
    }
    catch (error) {
        return null
    }
}
