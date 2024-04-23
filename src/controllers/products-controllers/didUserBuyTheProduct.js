import OrdersModel from "../../models/Orders.js";
import toObjectId from "../../utilities/toObjectId.js";

/**
* Checks if the user has bought the product brfore
* This done by looking at all user's orders if the given `productId` exist at least in one of his orders.
* 
* @param { string } productId - Id of the product to check if the user has bought it brfore.
* @param userId - Id of the user to check if he has bought the product brfore.
*
* @return { Promise<boolean | null> } true if the user has bought the product brfore, false if he didn't,
* `null` if an unexpected error occurred.
*/
export default async function didUserBuyTheProduct(productId, userId) {
    try {
        const result = await OrdersModel.aggregate([
            { $match: { userId: toObjectId(userId), state: "Completed" } },
            {
                $match: {
                    $expr: {
                        $reduce: {
                            input: "$products",
                            initialValue: 0,
                            in: {
                                $cond: {
                                    if: { $eq: [{ $substrBytes: ["$$this", 0, 24] }, productId] },
                                    then: { $add: ["$$value", 1] },
                                    else: { $add: ["$$value", 0] }
                                }
                            }
                        }
                    }
                }
            },
            { $limit: 1 },
            { $project: { _id: 1 } }
        ])
        return !!result.length;
    } catch (err) {
        console.log(err)
        return null;
    }
}
