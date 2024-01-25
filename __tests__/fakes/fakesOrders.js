
export function createFakeOrder({ userId, products }) {
    return {
        userId,
        location: {
            theName: "Abdulrhman Mohammed",
            phone: "0503219567",
            country: "Saudi Arabia",
            city: "macca",
            street: "Mansor Street",
            moreDetails: "Behind Abo Mohamed Resturent",
            type: "Home",
            id: "BpgkpDvPLWVeZPr17bcylocation"
        },
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
