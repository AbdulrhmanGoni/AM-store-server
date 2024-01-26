import UsersModel from "../../../../src/models/Users.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import { getArrayOfProducts } from "../../../fakes/fakesProducts.js"
import { closeTestServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await UsersModel.deleteMany({});
    await closeTestServer()
})

const routePath = (userId) => `/api/users/${userId}/shopping-cart`

describe("Test 'user_setShoppingCart_put' route handler", () => {

    it("Should replace user's shopping cart with another one and returns `true`", async () => {
        const { _id: userId } = await UsersModel.create(fakeUser);
        const products = getArrayOfProducts(5);
        const productsIds = products.map((product) => `${product._id}-1`);
        const response = await userRequest(routePath(userId), "put", { userId, body: { productsIds } })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { userShoppingCart } = await UsersModel.findById(userId, { userShoppingCart: true });
        expect(userShoppingCart).toEqual(
            expect.arrayContaining([expect.stringMatching(/\w{24}-[1-9]+/)])
        )
    })

})