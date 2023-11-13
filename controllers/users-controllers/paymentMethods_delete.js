import UserModel from "../../../models/Users.js";
import mainPathesInDataBase from "../../../CONSTANT/shortCutsPathesInDataBase.js";
const {
    paymentMethodesPathes: { choosedMethodPath, cardsListPath }
} = mainPathesInDataBase;

const paymentMethods_delete = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { cardNumber } = req.body;

        const { userPaymentMethodes: { choosedMethod } } = await UserModel.findByIdAndUpdate(userId,
            { $pull: { [cardsListPath]: { number: cardNumber } } }
        );

        if (choosedMethod) {
            if (choosedMethod.number === cardNumber) {
                await UserModel.updateOne({ _id: userId },
                    { $set: { [choosedMethodPath]: null } }
                );
            }
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default paymentMethods_delete;