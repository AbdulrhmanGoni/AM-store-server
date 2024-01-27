import ProductsCommentsModel from "../../../src/models/ProductsComments.js"
import fakeComments from "../../fakes/fakeProductComments.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"
import { closeTestingServer, userRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await ProductsCommentsModel.deleteMany({})
})

const { _id: productId } = getRandomProduct();
const userId = "6442ea0558a819df70390175"
const routePath = `/api/products/${productId}/comments`

describe("Test 'product_comments_put' route handler (Putting likes or dislikes on products comments)", () => {

    it("Should puts like on the added comment and returns `true`", async () => {
        const comment = fakeComments[0];
        await ProductsCommentsModel.create({ productId, comments: [comment] })
        const requestBody = {
            productId,
            commentId: comment.id,
            userId,
            actionType: "like",
            undo: false
        }
        const response = await userRequest(routePath, "put", { body: requestBody })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { comments } = await ProductsCommentsModel.findOne({ productId })
        expect(comments[0].likes[0].toString()).toBe(userId)
    })

    it("Should puts dislike on the added comment and returns `true`", async () => {
        const comment = fakeComments[0];
        await ProductsCommentsModel.create({ productId, comments: [comment] })
        const requestBody = {
            productId,
            commentId: comment.id,
            userId,
            actionType: "dislike",
            undo: false
        }
        const response = await userRequest(routePath, "put", { body: requestBody })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { comments } = await ProductsCommentsModel.findOne({ productId })
        expect(comments[0].dislikes[0].toString()).toBe(userId)
    })

    it("Should removes the putted like on the added comment and returns `true`", async () => {
        const comment = fakeComments[0];
        await ProductsCommentsModel.create({ productId, comments: [{ ...comment, likes: [userId] }] })
        const requestBody = {
            productId,
            commentId: comment.id,
            userId,
            actionType: "like",
            undo: true
        }
        const response = await userRequest(routePath, "put", { body: requestBody })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { comments } = await ProductsCommentsModel.findOne({ productId })
        expect(comments[0].likes.length).toBe(0)
    })

    it("Should removes the putted dislike on the added comment and returns `true`", async () => {
        const comment = fakeComments[0];
        await ProductsCommentsModel.create({ productId, comments: [{ ...comment, dislikes: [userId] }] })
        const requestBody = {
            productId,
            commentId: comment.id,
            userId,
            actionType: "dislike",
            undo: true
        }
        const response = await userRequest(routePath, "put", { body: requestBody })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { comments } = await ProductsCommentsModel.findOne({ productId })
        expect(comments[0].dislikes.length).toBe(0)
    })

})