import ProductsModel from "../../../src/models/Products.js"
import { getArrayOfProducts } from "../../fakes/fakesProducts.js";
import { closeTestingServer, adminRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await ProductsModel.deleteMany({});
    await closeTestingServer();
})

beforeAll(async () => {
    await ProductsModel.insertMany(getArrayOfProducts());
})

const queryKey = "top-serieses"
const routePath = (limit) => `/api/statistics?queryKey=${queryKey}&limit=${limit}`

describe(`GET /api/statistics?queryKey=${queryKey}`, () => {

    it("Should returns an object of two arrays, top 3 sold serieses array and top 3 earnings serieses array", async () => {
        const response = await adminRequest(routePath(3), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.topSold.length).toBe(3);
        expect(response.body.topEarnings.length).toBe(3);
        response.body.topEarnings.forEach(series => {
            expect(series).toMatchObject({
                value: expect.any(Number),
                series: expect.any(String)
            })
        });
    })

    it("Should returns an object of two arrays, top 4 sold serieses array and top 4 earnings serieses array", async () => {
        const response = await adminRequest(routePath(4), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.topSold.length).toBe(4);
        expect(response.body.topEarnings.length).toBe(4);
        response.body.topEarnings.forEach(series => {
            expect(series).toMatchObject({
                value: expect.any(Number),
                series: expect.any(String)
            })
        });
    })

})
