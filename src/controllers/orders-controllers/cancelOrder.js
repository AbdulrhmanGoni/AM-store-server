import OrdersModule from "../../models/Orders.js";


export default async function cancelOrder(userId, orderId) {
    try {
        const { modifiedCount } = await OrdersModule.updateOne(
            { _id: orderId, userId },
            { $set: { state: "Canceled", deliveryDate: "Canceled" } }
        );
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }

}