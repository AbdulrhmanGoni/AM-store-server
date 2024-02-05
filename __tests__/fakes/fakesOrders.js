import { readFileSync } from "fs";
import { getRandomLocation } from "./fakesLocations.js";
import { getRandomPaymentMethods } from "./fakesPaymentMethods.js";

const path = "./__tests__/fakes/fakesOrders.json"
const fakesOrders = JSON.parse(readFileSync(path, { encoding: "utf8" }))

export function createFakeOrder({ userId, products }) {
    return {
        userId,
        location: getRandomLocation(),
        totalPrice: 214.98,
        products,
        paymentMethod: getRandomPaymentMethods(),
        deliveryPrice: 0
    }
}

export function createArrayOfFakeOrders({ userId, products, length } = {}) {
    return fakesOrders.slice(0, length ?? fakesOrders.length).map((order) => {
        if (userId) order.userId = userId;
        if (products) order.products = products;
        return order;
    })
}
