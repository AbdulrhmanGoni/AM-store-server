import UsersModel from '../../models/Users.js';

export default async function usersOverview(page, pageSize) {

    try {
        const users = await UsersModel.aggregate([
            { $skip: (+page - 1) * +pageSize },
            { $limit: +pageSize + 1 },
            {
                $project: {
                    userName: 1,
                    userEmail: 1,
                    avatar: 1,
                    hisEmailVerified: 1,
                    userOrders: { $size: "$userOrders" },
                }
            }
        ])
        return {
            users: users.slice(0, +pageSize),
            isThereNextPage: !!users[+pageSize]
        }
    } catch (error) {
        console.log(error)
        return;
    }
}
