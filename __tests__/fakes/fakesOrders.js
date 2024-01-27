import { getRandomLocation } from "./fakesLocations";

export function createFakeOrder({ userId, products }) {
    return {
        userId,
        location: getRandomLocation(),
        totalPrice: 314.98,
        products,
        paymentMethod: {
            theName: "Abdulrhman Mohammed",
            number: "789876543341",
            expired: "2025-11-04"
        },
        state: "Completed",
        deliveryPrice: 0,
        discountCobone: {
            name: null
        },
        createdAt: "2023-07-09T10:44:42.017Z",
        expectedDeliveryDate: "July 16, 2023"
    }
}
