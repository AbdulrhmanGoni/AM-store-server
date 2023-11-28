import { userDataTypes } from '../../CONSTANT/projections.js';
import UsersModel from '../../models/Users.js';

export default async function getLocations(userId) {
    try {
        const { userAddress } = await UsersModel.findById(userId, userDataTypes.addresses);
        return userAddress;
    } catch (error) {
        return null;
    }
}
