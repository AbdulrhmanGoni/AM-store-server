import ProductsModel from "../../../src/models/Products.js"
import { getArrayOfProducts } from "../../fakes/fakesProducts.js"
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"

beforeAll(async () => {
    await ProductsModel.insertMany(getArrayOfProducts())
})

afterAll(async () => {
    await ProductsModel.deleteMany({})
    await closeTestingServer()
})

const routePath = "/api/admin/products"

describe("GET /api/admin/products", () => {

    it("Should returns an array of products with titles match 'u' and other three properties", async () => {
        const response = await adminRequest(`${routePath}?title=u&returnType=title,earnings,sold`, "get")
        expect(response.statusCode).toBe(200)
        response.body.forEach(product => {
            expect(Object.keys(product).length).toBe(4)
            expect(product.title).toMatch(/u/i)
            expect(product._id).toEqual(expect.any(String))
            expect(product.earnings).toEqual(expect.any(Number))
            expect(product.sold).toEqual(expect.any(Number))
        });
    })

    it("Should returns an array of clothes products with three properties `_id`, `category` and `title`", async () => {
        const response = await adminRequest(`${routePath}?category=clothes&returnType=title,category`, "get")
        expect(response.statusCode).toBe(200)
        response.body.forEach(product => {
            expect(Object.keys(product).length).toBe(3)
            expect(product.category).toBe("clothes")
            expect(product._id).toEqual(expect.any(String))
            expect(product.title).toEqual(expect.any(String))
        });
    })

    it("Should returns an array of One Piece series products", async () => {
        const response = await adminRequest(`${routePath}?series=One Piece&returnType=title,series`, "get")
        expect(response.statusCode).toBe(200)
        response.body.forEach(product => {
            expect(product.series).toBe("One Piece")
            expect(product._id).toEqual(expect.any(String))
            expect(product.title).toEqual(expect.any(String))
        });
    })

    it("Should returns an array of figurs products with titles match 'naruto'", async () => {
        const response = await adminRequest(`${routePath}?title=naruto`, "get")
        expect(response.statusCode).toBe(200)
        response.body.forEach(product => {
            expect(product.title).toMatch(/naruto/i)
        });
    })

    it("Should returns an empty array", async () => {
        const response = await adminRequest(`${routePath}?title=levi&category=zoom`, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(0)
    })

    it("Should returns an empty array", async () => {
        const response = await adminRequest(`${routePath}?title=ghsftj`, "get")
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(0)
    })

})