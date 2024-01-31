import { readFileSync } from "fs";
import { getRandomLocation } from "./fakesLocations.js";

const path = "./__tests__/fakes/fakesOrders.json"
const fakesOrders = JSON.parse(readFileSync(path, { encoding: "utf8" }))

export function createFakeOrder({ userId, products, discountCobone }) {
    return {
        userId,
        location: getRandomLocation(),
        totalPrice: 214.98,
        products,
        paymentMethod: {
            theName: "Abdulrhman Mohammed",
            number: "789876543341",
            expired: "2025-11-04"
        },
        deliveryPrice: 0,
        discountCobone
    }
}

export function createArrayOfFakeOrders({ userId, products, length } = {}) {
    return fakesOrders.slice(0, length ?? fakesOrders.length).map((order) => {
        if (userId) order.userId = userId;
        if (products) order.products = products;
        return order;
    })
}
