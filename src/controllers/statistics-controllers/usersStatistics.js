import UsersModel from "../../models/Users.js";

export default async function usersStatistics() {
    try {
        const [statistics] = await UsersModel.aggregate([
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
        return statistics;
    } catch (error) {
        console.log(error)
        return null;
    }
}
