import OrdersModel from "../../models/Orders.js";


export default async function cancelOrder(orderId, userId) {
    try {
        const { modifiedCount } = await OrdersModel.updateOne(
            { _id: orderId, userId },
            { $set: { state: "Canceled", expectedDeliveryDate: "Canceled" } }
        );
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }

}