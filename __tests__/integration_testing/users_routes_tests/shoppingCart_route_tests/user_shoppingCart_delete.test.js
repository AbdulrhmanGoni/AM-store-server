import UsersModel from "../../../../src/models/Users.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import { getArrayOfProducts } from "../../../fakes/fakesProducts.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

const routePath = (userId) => `/api/users/${userId}/shopping-cart`

describe("Test 'user_shoppingCart_delete' route handler", () => {

    it("Should removes a specific product from user's shopping cart and returns `true`", async () => {
        const products = getArrayOfProducts(3);
        const productsIds = products.map((product) => `${product._id}-1`);
        const { _id: userId } = await UsersModel.create({ ...fakeUser, userShoppingCart: productsIds });
        const requestOptions = { userId, body: { productId: products[1]._id } }
        const response = await userRequest(routePath(userId), "delete", requestOptions)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { userShoppingCart } = await UsersModel.findById(userId, { userShoppingCart: true });
        expect(userShoppingCart.length).toBe(productsIds.length - 1)
    })

    it("Should clears user's shopping cart and returns `true`", async () => {
        const products = getArrayOfProducts(4);
        const productsIds = products.map((product) => `${product._id}-1`);
        const { _id: userId } = await UsersModel.create({ ...fakeUser, userShoppingCart: productsIds });
        const response = await userRequest(routePath(userId), "delete", { userId, body: { actionType: "clear" } })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { userShoppingCart } = await UsersModel.findById(userId, { userShoppingCart: true });
        expect(userShoppingCart.length).toBe(0)
    })

})