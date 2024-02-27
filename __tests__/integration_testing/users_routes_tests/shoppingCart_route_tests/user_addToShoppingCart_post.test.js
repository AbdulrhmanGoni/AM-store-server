import UsersModel from "../../../../src/models/Users.js"
import { fakeUser } from "../../../fakes/fakeUsers.js"
import { getRandomProduct } from "../../../fakes/fakesProducts.js"
import { closeTestingServer, userRequest } from "../../../helpers/testRequest.js"

afterAll(async () => {
    await UsersModel.deleteMany({});
    await closeTestingServer()
})

const routePath = (userId) => `/api/users/${userId}/shopping-cart`

describe("POST /api/users/:userId/shopping-cart", () => {

    it("Should adds a product into user's shopping cart and returns `true`", async () => {
        const product = getRandomProduct()
        const requestBody = { productId: product._id, count: 1 }
        const { _id: userId } = await UsersModel.create(fakeUser);
        const response = await userRequest(routePath(userId), "post", { userId, body: requestBody })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { userShoppingCart } = await UsersModel.findById(userId, { userShoppingCart: true });
        expect(userShoppingCart.length).toBe(1)
        expect(userShoppingCart[0]).toBe(`${product._id}-${requestBody.count}`)
    })

    it("Should increments the count of the added product to 3 in user's shopping cart and returns `true`", async () => {
        const product = getRandomProduct()
        const requestBody = { productId: product._id, count: 3 }
        const user = { ...fakeUser, userShoppingCart: [`${product._id}-1`] }
        const { _id: userId } = await UsersModel.create(user);
        const response = await userRequest(routePath(userId), "post", { userId, body: requestBody })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { userShoppingCart } = await UsersModel.findById(userId, { userShoppingCart: true });
        expect(userShoppingCart.length).toBe(1)
        expect(userShoppingCart[0]).toBe(`${product._id}-${requestBody.count}`)
    })

    it("Should decrements the count of the added product to 2 in user's shopping cart and returns `true`", async () => {
        const product = getRandomProduct()
        const requestBody = { productId: product._id, count: 2 }
        const user = { ...fakeUser, userShoppingCart: [`${product._id}-4`] }
        const { _id: userId } = await UsersModel.create(user);
        const response = await userRequest(routePath(userId), "post", { userId, body: requestBody })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { userShoppingCart } = await UsersModel.findById(userId, { userShoppingCart: true });
        expect(userShoppingCart.length).toBe(1)
        expect(userShoppingCart[0]).toBe(`${product._id}-${requestBody.count}`)
    })

})