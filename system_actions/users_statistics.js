import UserModel from '../models/Users.js';

export default async function users_statistics(req, res) {
    try {
        const users = await UserModel.aggregate([
            {
                $project: {
                    userName: 1,
                    userEmail: 1,
                    avatar: 1,
                    userOrders: { $size: "$userOrders" }
                }
            }
        ])
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}
