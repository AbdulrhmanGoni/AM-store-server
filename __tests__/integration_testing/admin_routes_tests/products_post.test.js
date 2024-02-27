import ProductsModel from "../../../src/models/Products.js"
import { ObjectId } from "../../../src/utilities/schemaTypesOptions.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"

afterAll(async () => {
    await ProductsModel.deleteMany({})
    await closeTestingServer()
})

const routePath = "/api/admin/products"

describe("POST /api/admin/products", () => {

    it("Should adds a product to the database and returns `true`", async () => {
        const product = getRandomProduct()
        const response = await adminRequest(routePath, "post", { body: product })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const theAddedProduct = await ProductsModel.findOne({})
        expect(theAddedProduct).toMatchObject({ ...product, _id: new ObjectId(product._id) })
    })

})