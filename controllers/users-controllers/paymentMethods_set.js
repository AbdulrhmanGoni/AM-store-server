import UserModel from "../../../models/Users.js";
import mainPathesInDataBase from "../../../CONSTANT/shortCutsPathesInDataBase.js";
const {
    paymentMethodesPathes: { choosedMethodPath, cardsListPath }
} = mainPathesInDataBase;

const paymentMethods_set = async (req, res, next) => {
    try {
        const { theCard, type } = req.body;
        let filter = { _id: req.params.userId };
        if (type === "choosedMethod") {
            await UserModel.updateOne(filter, { $set: { [choosedMethodPath]: theCard } });
        } else {
            await UserModel.updateOne(filter, {
                $push: { [cardsListPath]: theCard },
                $set: { [choosedMethodPath]: theCard }
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default paymentMethods_set;