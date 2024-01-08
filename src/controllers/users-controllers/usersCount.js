import UsersModel from '../../models/Users.js';

export default async function usersCount() {
    return await UsersModel.count();
}
