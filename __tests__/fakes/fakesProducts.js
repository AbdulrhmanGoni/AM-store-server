import { readFileSync } from "fs";

const path = "./__tests__/fakes/fakesProducts.json"
const products = JSON.parse(readFileSync(path, { encoding: "utf8" }))

export function getRandomProduct() {
    return products[Math.floor(Math.random() * products.length)]
}

export function getArrayOfProducts(length = products.length) {
    return products.slice(0, length)
}
