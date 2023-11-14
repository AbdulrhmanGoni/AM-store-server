import UserModel from '../../models/Users';
import shortCutsPathesInDataBase from '../../CONSTANT/shortCutsPathesInDataBase';
import { userDataTypes } from '../../CONSTANT/projections';

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
