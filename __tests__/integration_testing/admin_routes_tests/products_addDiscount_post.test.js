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

describe("POST /api/admin/products/discounts", () => {

    it("Should adds a discount 20% to a product and returns `true`", async () => {
        const product = getRandomProduct()
        const { _id } = await ProductsModel.create(product)
        const requestBody = { productsIds: [_id], discount: .2 }
        const response = await adminRequest(routePath, "post", { body: requestBody })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { discount } = await ProductsModel.findById(_id)
        expect(discount).toBe(.2)
    })

    it("Should adds a discount 30% to three products and returns `true`", async () => {
        const theProducts = getArrayOfProducts(3)
        await ProductsModel.insertMany(theProducts)
        const requestBody = { productsIds: theProducts.map((product) => product._id), discount: .3 }
        const response = await adminRequest(routePath, "post", { body: requestBody })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const products = await ProductsModel.find({})
        expect(products).toEqual(
            expect.arrayContaining(
                [expect.objectContaining({ discount: .30 })]
            )
        )
    })

})