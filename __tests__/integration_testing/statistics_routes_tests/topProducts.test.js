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

const queryKey = "top-products"
const routePath = (limit) => `/api/statistics?queryKey=${queryKey}&limit=${limit}`

describe(`Test 'statistics_get' route handler with queryKey: "${queryKey}"`, () => {

    it("Should returns an array of top 5 products", async () => {
        const response = await adminRequest(routePath(5), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.topSales.length).toBe(5);
        expect(response.body.topEarnings.length).toBe(5);
        response.body.topEarnings.forEach(product => {
            expect(product).toMatchObject({
                _id: expect.any(String),
                title: expect.any(String),
                category: expect.any(String),
                series: expect.any(String),
                description: expect.any(String),
                images: expect.any(Array),
                price: expect.any(Number),
                earnings: expect.any(Number)
            })
        });
        response.body.topSales.forEach(product => {
            expect(product).toMatchObject({
                _id: expect.any(String),
                title: expect.any(String),
                category: expect.any(String),
                series: expect.any(String),
                description: expect.any(String),
                images: expect.any(Array),
                price: expect.any(Number),
                sold: expect.any(Number)
            })
        });
    })

    it("Should returns an array of top 3 products", async () => {
        const response = await adminRequest(routePath(3), "get");
        expect(response.statusCode).toBe(200);
        expect(response.body.topSales.length).toBe(3);
        expect(response.body.topEarnings.length).toBe(3);
        response.body.topEarnings.forEach((product, index) => {
            expect(product.earnings).toBeGreaterThanOrEqual(response.body.topEarnings[index].earnings);
            expect(product).toMatchObject({
                _id: expect.any(String),
                title: expect.any(String),
                category: expect.any(String),
                series: expect.any(String),
                description: expect.any(String),
                images: expect.any(Array),
                price: expect.any(Number),
                earnings: expect.any(Number)
            })
        });
        response.body.topSales.forEach((product, index) => {
            expect(product.sold).toBeGreaterThanOrEqual(response.body.topSales[index].sold);
            expect(product).toMatchObject({
                _id: expect.any(String),
                title: expect.any(String),
                category: expect.any(String),
                series: expect.any(String),
                description: expect.any(String),
                images: expect.any(Array),
                price: expect.any(Number),
                sold: expect.any(Number)
            })
        });
    })

})
