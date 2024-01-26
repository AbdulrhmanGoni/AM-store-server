import UsersModel from "../../../../src/models/Users.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import { getArrayOfProducts } from "../../../fakes/fakesProducts.js"
import { closeTestServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await UsersModel.deleteMany({});
    await closeTestServer()
})

const routePath = (userId) => `/api/users/${userId}/favorites`

describe("Test 'user_favorites_put' route handler", () => {

    it("Should replace user's favorites with another one and returns `true`", async () => {
        const { _id: userId } = await UsersModel.create(fakeUser);
        const products = getArrayOfProducts(4);
        const productsIds = products.map((product) => product._id);
        const response = await userRequest(routePath(userId), "put", { userId, body: { favorites: productsIds } })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { userFavorites } = await UsersModel.findById(userId, { userFavorites: true });
        expect(productsIds.toString()).toEqual(userFavorites.toString())
    })

    it("Should replace user's favorites with an empty array and returns `true`", async () => {
        const products = getArrayOfProducts(6);
        const productsIds = products.map((product) => product._id);
        const { _id: userId } = await UsersModel.create({ ...fakeUser, userFavorites: productsIds });
        const response = await userRequest(routePath(userId), "put", { userId, body: { favorites: [] } })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { userFavorites } = await UsersModel.findById(userId, { userFavorites: true });
        expect(userFavorites.length).toBe(0)
    })

})