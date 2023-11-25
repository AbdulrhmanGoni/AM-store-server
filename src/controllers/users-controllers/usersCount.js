import UserModel from '../../models/Users.js';

export default async function usersCount() {
    try {
        const usersCount = await UserModel.count();
        return usersCount;
    } catch (error) {
        console.log(error)
        return null;
    }
}
