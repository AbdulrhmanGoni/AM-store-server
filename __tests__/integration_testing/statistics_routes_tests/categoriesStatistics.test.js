import ProductsModel from "../../../src/models/Products.js"
import { getArrayOfProducts } from "../../fakes/fakesProducts.js";
import { closeTestingServer, adminRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer();
})

afterEach(async () => {
    await ProductsModel.deleteMany({});
})

const queryKey = "categories-statistics"
const routePath = `/api/statistics?queryKey=${queryKey}`

describe(`GET /api/statistics?queryKey=${queryKey}`, () => {

    it("Should returns an empty array because there nothing in the database ", async () => {
        const response = await adminRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(0);
    })

    it("Should returns categories statistics", async () => {
        await ProductsModel.insertMany(getArrayOfProducts())
        const response = await adminRequest(routePath, "get");
        expect(response.statusCode).toBe(200);
        response.body.forEach(category => {
            expect(category).toMatchObject({
                productsCount: expect.any(Number),
                totalEarnings: expect.any(Number),
                productsSold: expect.any(Number)
            })
        });
    })

})