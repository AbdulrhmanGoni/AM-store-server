import eventEmiter from './eventEmiter.js';

export default function sendNewOrderEvent(newOrder, userData) {
    const {
        _id,
        totalPrice,
        products,
        state,
        expectedDeliveryDate,
        deliveryPrice,
        createdAt
    } = newOrder

    eventEmiter.emit("new-order", {
        _id,
        totalPrice,
        products,
        state,
        expectedDeliveryDate,
        deliveryPrice,
        createdAt,
        userData
    })
}