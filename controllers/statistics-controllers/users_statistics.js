import UserModel from "../../models/Users.js";

export default async function users_statistics(req, res) {
    try {
        const [statistics] = await UserModel.aggregate([
            {
                $group: {
                    _id: "users",
                    usersCount: { $count: {} },
                    verifiedUsers: {
                        $sum: {
                            $cond: {
                                if: "$hisEmailVerified",
                                then: 1,
                                else: 0,
                            }
                        }
                    },
                    customersCount: {
                        $sum: {
                            $cond: {
                                if: { $gt: [{ $size: "$userOrders" }, 0] },
                                then: 1,
                                else: 0,
                            }
                        }
                    }
                }
            }
        ])
        res.status(200).json(statistics);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}
