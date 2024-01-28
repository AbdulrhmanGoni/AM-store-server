import ProductsModel from "../../../src/models/Products.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"

afterAll(async () => {
    await ProductsModel.deleteMany({})
    await closeTestingServer()
})

const routePath = (productId) => `/api/admin/products/${productId}`

describe("Test 'product_patch' route handler", () => {

    it("Should changes the title of the product and returns `true`", async () => {
        const product = getRandomProduct()
        const { _id } = await ProductsModel.create(product)
        const requestBody = { changes: { title: "Testing title" } }
        const response = await adminRequest(routePath(_id), "patch", { body: requestBody })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { title: productTitle } = await ProductsModel.findById(_id)
        expect(productTitle).toBe("Testing title")
    })

    it("Should changes the price and the amount of the product and returns `true`", async () => {
        const product = getRandomProduct()
        const { _id } = await ProductsModel.create(product)
        const requestBody = { changes: { price: 33.5, amount: 18 } }
        const response = await adminRequest(routePath(_id), "patch", { body: requestBody })
        expect(response.statusCode).toBe(200)
        const { price: productPrice, amount: productAmount } = await ProductsModel.findById(_id)
        expect(productPrice).toBe(33.5)
        expect(productAmount).toBe(18)
    })

})