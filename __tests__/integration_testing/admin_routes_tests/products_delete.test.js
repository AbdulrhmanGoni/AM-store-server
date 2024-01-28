import ProductsModel from "../../../src/models/Products.js"
import { ObjectId } from "../../../src/utilities/schemaTypesOptions.js"
import { getArrayOfProducts, getRandomProduct } from "../../fakes/fakesProducts.js"
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"

afterAll(async () => {
    await ProductsModel.deleteMany({})
    await closeTestingServer()
})

const routePath = "/api/admin/products"

describe("Test 'products_delete' route handler", () => {

    it("Should deletes a product from the database and returns `true`", async () => {
        const product = getRandomProduct()
        await ProductsModel.create(product)
        const response = await adminRequest(routePath, "delete", { body: { productsIds: [product._id] } })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const products = await ProductsModel.find({})
        expect(products.length).toBe(0)
    })

    it("Should deletes mullti products from the database and returns `true`", async () => {
        const productsArray = getArrayOfProducts()
        await ProductsModel.insertMany(productsArray)
        const productsIdsToDelete = new Array(4)
        for (let i = 0; i < 4; i++) {
            productsIdsToDelete[i] = productsArray[i]._id
        }
        const response = await adminRequest(routePath, "delete", { body: { productsIds: productsIdsToDelete } })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const products = await ProductsModel.find({})
        expect(products.length).toBe(productsArray.length - 4)
        expect(products).not.toEqual(
            expect.arrayContaining(
                productsIdsToDelete.map((id) => {
                    expect.objectContaining({ _id: new ObjectId(id) })
                })
            )
        )
    })

})