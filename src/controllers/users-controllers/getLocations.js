import { userDataTypes } from '../../CONSTANT/projections.js';
import UserModel from '../../models/Users.js';

export default async function getLocations(userId) {
    try {
        const { userAddress } = await UserModel.findById(userId, userDataTypes.addresses);
        return userAddress;
    } catch (error) {
        return null;
    }
}
