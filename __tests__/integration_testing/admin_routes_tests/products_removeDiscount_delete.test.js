import ProductsModel from "../../../src/models/Products.js"
import { getArrayOfProducts, getRandomProduct } from "../../fakes/fakesProducts.js"
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await ProductsModel.deleteMany({})
})

const routePath = `/api/admin/products/discounts`

describe("DELETE /api/admin/products/discounts", () => {

    it("Should removes the discount from the product and returns `true`", async () => {
        const product = getRandomProduct()
        const { _id } = await ProductsModel.create({ ...product, discount: .5 })
        const requestBody = { productsIds: [_id] }
        const response = await adminRequest(routePath, "delete", { body: requestBody })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { discount } = await ProductsModel.findById(_id)
        expect(discount).toBeFalsy()
    })

    it("Should removes the discount from the four products and returns `true`", async () => {
        const theProducts = getArrayOfProducts(4)
        const productsIds = new Array(4)
        await ProductsModel.insertMany(theProducts.map((product) => {
            productsIds.push(product._id)
            return { ...product, discount: .4 }
        }))
        const response = await adminRequest(routePath, "delete", { body: { productsIds } })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const products = await ProductsModel.find({})
        products.forEach((product) => {
            expect(product.discount).toBeFalsy()
        })
    })

})