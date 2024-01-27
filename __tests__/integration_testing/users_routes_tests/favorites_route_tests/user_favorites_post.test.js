import UsersModel from "../../../../src/models/Users.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import { getRandomProduct } from "../../../fakes/fakesProducts.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await UsersModel.deleteMany({});
    await closeTestingServer()
})

const routePath = (userId) => `/api/users/${userId}/favorites`

describe("Test 'user_favorites_post' route handler", () => {

    it("Should adds a product into user's favorites and returns `true`", async () => {
        const { _id: userId } = await UsersModel.create(fakeUser);
        const product = getRandomProduct();
        const requestOptions = { userId, body: { productId: product._id } };
        const response = await userRequest(routePath(userId), "post", requestOptions)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { userFavorites } = await UsersModel.findById(userId, { userFavorites: true });
        expect(userFavorites.length).toBe(1)
        expect(userFavorites[0].toString()).toBe(product._id)
    })

    it("Should removes a product from user's favorites and returns `true`", async () => {
        const product = getRandomProduct();
        const { _id: userId } = await UsersModel.create({ ...fakeUser, userFavorites: [product._id] });
        const requestOptions = { userId, body: { productId: product._id } };
        const response = await userRequest(routePath(userId), "post", requestOptions)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { userFavorites } = await UsersModel.findById(userId, { userFavorites: true });
        expect(userFavorites.length).toBe(0)
        expect(userFavorites[0]).toBeUndefined()
    })

})