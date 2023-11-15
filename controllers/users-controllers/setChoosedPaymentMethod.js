import UserModel from '../../models/Users.js';
import shortCutsPathesInDataBase from '../../CONSTANT/shortCutsPathesInDataBase.js';
import { userDataTypes } from '../../CONSTANT/projections.js';

export default async function setChoosedPaymentMethod(userId, theCard) {
    const { choosedMethodPath } = shortCutsPathesInDataBase.paymentMethodesPathes;
    try {
        return await UserModel.findByIdAndUpdate(
            userId,
            { $set: { [choosedMethodPath]: theCard } },
            { new: true, projection: userDataTypes.paymentMethodes }
        );
    } catch (error) {
        console.log(error)
        return null;
    }
}
