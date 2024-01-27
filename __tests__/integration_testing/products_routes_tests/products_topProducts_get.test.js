import ProductsModel from "../../../src/models/Products.js"
import { getArrayOfProducts } from "../../fakes/fakesProducts.js"
import { closeTestingServer, userRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await ProductsModel.deleteMany({})
})

const routePath = "/api/products/top-products"

describe("Test 'products_topProducts_get' route handler", () => {

    it("Should returns an empty array", async () => {
        await ProductsModel.insertMany(getArrayOfProducts(0))
        const response = await userRequest(`${routePath}?sortBy=earnings&limit=0`, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeSortedProductsBy("earnings")
        expect(response.body.length).toBe(0)
    })

    it("Should returns an array of 5 products sorted by their earnings", async () => {
        const productsCount = 5
        await ProductsModel.insertMany(getArrayOfProducts(productsCount))
        const response = await userRequest(`${routePath}?sortBy=earnings&limit=${productsCount}`, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeSortedProductsBy("earnings")
        expect(response.body.length).toBe(productsCount)
    })

    it("Should returns an array of 7 products sorted by how many times they sold", async () => {
        const productsCount = 7
        await ProductsModel.insertMany(getArrayOfProducts(productsCount))
        const response = await userRequest(`${routePath}?sortBy=sold&limit=${productsCount}`, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeSortedProductsBy("sold")
        expect(response.body.length).toBe(productsCount)
    })

})

expect.extend({
    toBeSortedProductsBy(receivedArray, sortedBy) {
        if (!(receivedArray instanceof Array)) {
            throw new TypeError("The received value must be an array");
        }
        if (!(sortedBy === "earnings" || sortedBy === "sold")) {
            throw new TypeError("Sorting value must 'earnings' or 'sold'");
        }

        const pass = receivedArray.reduce((_, current, index) => {
            const nextProductValue = receivedArray[index + 1]?.[sortedBy]
            return nextProductValue !== undefined ? current[sortedBy] >= nextProductValue : true
        }, true)

        if (pass) {
            return {
                message: "The products realy sorted",
                pass
            };
        } else {
            return {
                message: `The products did not sorted by ${sortedBy === "sold" ? "sales" : sortedBy}`,
                pass
            };
        }
    }
})
