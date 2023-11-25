import UserModel from '../../models/Users.js';
import shortCutsPathesInDataBase from '../../CONSTANT/shortCutsPathesInDataBase.js';
import { Types } from 'mongoose';

export default async function setChoosedPaymentMethod(userId, theCard) {
    const { choosedMethodPath } = shortCutsPathesInDataBase.paymentMethodesPathes;
    try {
        const { modifiedCount } = await UserModel.updateOne({ _id: new Types.ObjectId(userId) }, { $set: { [choosedMethodPath]: theCard } });
        return !!modifiedCount
    } catch (error) {
        console.log(error)
        return null;
    }
}
