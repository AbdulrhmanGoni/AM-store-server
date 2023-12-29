import UsersModel from '../../models/Users.js';
import shortCutsPathesInDataBase from '../../CONSTANT/shortCutsPathesInDataBase.js';
import toObjectId from '../../utilities/toObjectId.js';

export default async function setChoosedPaymentMethod(userId, theCard) {
    const { choosedMethodPath } = shortCutsPathesInDataBase.paymentMethodesPathes;
    try {
        const { modifiedCount } = await UsersModel.updateOne({ _id: toObjectId(userId) }, { $set: { [choosedMethodPath]: theCard } });
        return !!modifiedCount
    } catch (error) {
        console.log(error)
        return null;
    }
}
