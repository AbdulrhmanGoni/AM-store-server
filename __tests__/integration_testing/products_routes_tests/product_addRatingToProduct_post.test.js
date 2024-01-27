import { Types } from "mongoose"
import ProductsModel from "../../../src/models/Products.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"
import { fakeUserId } from "../../fakes/testingAuth.js"
import { anyRequest, closeTestingServer, userRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    closeTestingServer()
})

afterEach(async () => {
    await ProductsModel.deleteMany({})
})

const product = getRandomProduct();
const routePath = `/api/products/${product._id}/rating`

describe("Test 'product_addRatingToProduct_post' route handler", () => {

    it("Should returns unauthorized message with status code 401 because authorization token not included", async () => {
        await ProductsModel.create(product)
        const response = await anyRequest(routePath, "post", { userId: fakeUserId, rate: 5 })
        expect(response.statusCode).toBe(401)
        expect(response.body).toMatchObject({
            message: 'You need some credentials first to access this api'
        })
    })

    it("Should adds the rating (5) and returns `true`", async () => {
        await addRatingTest(5)
    })

    it("Should adds the rating (3) and returns `true`", async () => {
        await addRatingTest(3)
    })

})

async function addRatingTest(testingRate) {
    const userId = fakeUserId
    const { _id } = await ProductsModel.create(product)
    const requestOptions = { body: { userId, rate: testingRate }, userId }
    const response = await userRequest(routePath, "post", requestOptions)

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe(true)
    const { ratings } = await ProductsModel.findById(_id, { ratings: true })
    expect(ratings[0]).toMatchObject({ raterId: new Types.ObjectId(userId), rating: testingRate })

}