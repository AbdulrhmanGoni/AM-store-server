import UsersModel from '../../models/Users.js';

export default async function usersCount() {
    try {
        const usersCount = await UsersModel.count();
        return usersCount;
    } catch (error) {
        console.log(error)
        return null;
    }
}
