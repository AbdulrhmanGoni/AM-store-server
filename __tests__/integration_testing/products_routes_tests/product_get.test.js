import ProductsModel from "../../../src/models/Products.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"
import { closeTestingServer, anyRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await ProductsModel.deleteMany({})
})

const routePath = "/api/products"

describe("GET /api/products", () => {

    it("Should returns null with status code 404", async () => {
        const randomId = "65ac120ee8acb26ee9dcd95b"
        const response = await anyRequest(`${routePath}/${randomId}`, "get")
        expect(response.statusCode).toBe(404)
        expect(response.body).toBe(null)
    })

    it("Should returns a product with status code 200", async () => {
        const product = getRandomProduct()
        const { _id } = await ProductsModel.create(product)
        const response = await anyRequest(`${routePath}/${_id}`, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({ ...product, _id: _id.toString() })
    })

})