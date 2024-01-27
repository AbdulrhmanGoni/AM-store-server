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

const routePath = (userId) => `/api/users/${userId}/favorites`

describe("Test 'user_favorites_get' route handler", () => {

    it("Should returns an array of one product id from user's favorites", async () => {
        const product = getRandomProduct();
        const user = { ...fakeUser, userFavorites: [product._id] };
        await ProductsModel.create(product);
        const { _id: userId } = await UsersModel.create(user);
        const response = await userRequest(routePath(userId), "get", { userId });
        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toBe(product._id);
    })

    it("Should returns an array of products ids from user's favorites", async () => {
        const products = getArrayOfProducts(5);
        const productsIds = products.map((product) => product._id);
        const user = { ...fakeUser, userFavorites: productsIds };
        const { _id: userId } = await UsersModel.create(user);
        const response = await userRequest(routePath(userId), "get", { userId });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining(productsIds))
    })
})