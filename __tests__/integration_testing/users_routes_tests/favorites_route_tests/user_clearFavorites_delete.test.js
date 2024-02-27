import UsersModel from "../../../../src/models/Users.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import { getArrayOfProducts } from "../../../fakes/fakesProducts.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await UsersModel.deleteMany({});
    await closeTestingServer();
})

const routePath = (userId) => `/api/users/${userId}/favorites`

describe("DELETE /api/users/:userId/favorites", () => {

    it("Should clears user's favorites and returns `true`", async () => {
        const products = getArrayOfProducts(3);
        const productsIds = products.map((product) => product._id);
        const { _id: userId } = await UsersModel.create({ ...fakeUser, userFavorites: productsIds });
        const response = await userRequest(routePath(userId), "delete", { userId })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { userFavorites } = await UsersModel.findById(userId, { userFavorites: true });
        expect(userFavorites.length).toBe(0)
    })

})