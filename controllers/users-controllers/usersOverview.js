import UserModel from '../../models/Users.js';

export default async function usersOverview(req, res) {

    const { page, limit: pageSize } = req.query;

    try {
        const users = await UserModel.aggregate([
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
        res.status(200).json({
            users: users.slice(0, +pageSize),
            isThereNextPage: !!users[+pageSize]
        });
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}