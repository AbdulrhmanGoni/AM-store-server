import ProductsModel from "../../../src/models/Products.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"

afterAll(async () => {
    await ProductsModel.deleteMany({})
    await closeTestingServer()
})

const routePath = (productId) => `/api/admin/products/${productId}`

describe("GET /api/admin/products/:productId", () => {

    it("Should returns null with status code 404", async () => {
        const randomId = "65ac120ee8acb26ee9dcd95b"
        const response = await adminRequest(routePath(randomId), "get")
        expect(response.statusCode).toBe(404)
        expect(response.body).toBe(null)
    })

    it("Should returns the full data of the product", async () => {
        const product = getRandomProduct()
        const { _id } = await ProductsModel.create(product)
        const response = await adminRequest(routePath(_id), "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({ ...product, _id: _id.toString() })
        expect(response.body).toMatchObject({
            _id: expect.any(String),
            title: expect.any(String),
            images: response.body.images.map(() => expect.any(String)),
            price: expect.any(Number),
            category: expect.any(String),
            series: expect.any(String),
            description: expect.any(String),
            amount: expect.any(Number),
            sold: expect.any(Number),
            earnings: expect.any(Number)
        })
    })

})