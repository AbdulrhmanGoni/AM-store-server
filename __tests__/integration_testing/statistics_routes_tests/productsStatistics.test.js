import ProductsModel from "../../../src/models/Products.js"
import { fakeCategoriesArray, getArrayOfProducts, totalProducts } from "../../fakes/fakesProducts.js";
import { closeTestingServer, adminRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer();
})

afterEach(async () => {
    await ProductsModel.deleteMany({});
})

const queryKey = "products-statistics"
const routePath = `/api/statistics?queryKey=${queryKey}`

describe(`GET /api/statistics?queryKey=${queryKey}`, () => {

    it("Should returns an empty object because there no products in the database", async () => {
        const response = await adminRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body)).toHaveLength(0);
    })

    it("Should returns products statistics", async () => {
        await ProductsModel.insertMany(getArrayOfProducts())
        const response = await adminRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            totalProducts: totalProducts,
            totalProductsSold: expect.any(Number),
            totalInStock: expect.any(Number),
            productsOutOfStock: expect.any(Number),
            categoriesCount: fakeCategoriesArray.length,
            seriesCount: expect.any(Number)
        })
    })

})