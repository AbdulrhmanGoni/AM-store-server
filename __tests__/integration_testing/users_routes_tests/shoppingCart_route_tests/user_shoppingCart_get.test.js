import ProductsModel from "../../../../src/models/Products.js"
import UsersModel from "../../../../src/models/Users.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import { getArrayOfProducts, getRandomProduct } from "../../../fakes/fakesProducts.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await ProductsModel.deleteMany({});
    await UsersModel.deleteMany({});
})

const routePath = (userId) => `/api/users/${userId}/shopping-cart`

describe("Test 'user_shoppingCart_get' route handler", () => {

    it("Should returns an array of one product from user's shopping cart", async () => {
        const product = getRandomProduct();
        const user = { ...fakeUser, userShoppingCart: [`${product._id}-1`] };
        await ProductsModel.create(product);
        const { _id: userId } = await UsersModel.create(user);
        const response = await userRequest(routePath(userId), "get", { userId });
        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toMatchObject(product);
    })

    it("Should returns an array of products from user's shopping cart", async () => {
        const products = getArrayOfProducts(5);
        const userShoppingCart = products.map((product) => `${product._id}-1`);
        const user = { ...fakeUser, userShoppingCart };
        await ProductsModel.insertMany(products)
        const { _id: userId } = await UsersModel.create(user);
        const response = await userRequest(routePath(userId), "get", { userId });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: expect.any(String),
                    title: expect.any(String),
                    title: expect.any(String),
                    images: [expect.any(String)],
                    price: expect.any(Number),
                    category: expect.any(String),
                    series: expect.any(String),
                    description: expect.any(String)
                })
            ])
        );
    })
})