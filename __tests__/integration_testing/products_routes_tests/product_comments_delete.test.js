import ProductsCommentsModel from "../../../src/models/ProductsComments.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"
import fakeComments from "../../fakes/fakeProductComments.js"
import { closeTestingServer, userRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await ProductsCommentsModel.deleteMany({})
    await closeTestingServer()
})

const { _id: productId } = getRandomProduct();
const routePath = `/api/products/${productId}/comments`

describe("DELETE /api/products/:productId/comments", () => {

    it("Should deletes the added comment and returns `true`", async () => {
        const comment = fakeComments[0];
        await ProductsCommentsModel.create({ productId, comments: [comment] })
        const response = await userRequest(routePath, "delete", { body: { commentId: comment.id } })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { comments } = await ProductsCommentsModel.findOne({ productId }, { comments: true })
        expect(comments.length).toBe(0)
    })

    it("Should returns `false` with status code 400", async () => {
        const comment = fakeComments[0];
        const response = await userRequest(routePath, "delete", { body: { commentId: comment.id } })
        expect(response.statusCode).toBe(400)
        expect(response.body).toBe(false)
    })

})