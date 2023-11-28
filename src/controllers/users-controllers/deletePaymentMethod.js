import shortCutsPathesInDataBase from "../../CONSTANT/shortCutsPathesInDataBase.js";
import UsersModel from "../../models/Users.js";


export default async function deletePaymentMethod(userId, cardNumber) {
    try {
        const { cardsListPath, choosedMethodPath } = shortCutsPathesInDataBase.paymentMethodesPathes;
        const filter = { _id: userId };
        const { modifiedCount } = await UsersModel.bulkWrite([
            {
                updateOne: {
                    filter,
                    update: { $pull: { [cardsListPath]: { number: cardNumber } } }
                },
            },
            {
                updateOne: {
                    filter: {
                        ...filter,
                        [choosedMethodPath + ".number"]: cardNumber
                    },
                    update: { $set: { [choosedMethodPath]: null } }
                },
            }
        ])
        return !!modifiedCount
    } catch (error) {
        console.log(error)
        return null;
    }
}
