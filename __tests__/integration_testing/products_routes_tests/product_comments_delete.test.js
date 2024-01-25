import request from "supertest"
import mongoose from "mongoose"
import server from "../../../src/server.js"
import ProductsCommentsModel from "../../../src/models/ProductsComments.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"
import fakeComments from "../../fakes/fakeProductComments.js"

afterAll(async () => {
    await ProductsCommentsModel.deleteMany({})
    await mongoose.disconnect()
    server.close()
})

const { _id: productId } = getRandomProduct();
const routePath = `/api/products/${productId}/comments`

describe("Test 'product_comments_delete' route handler", () => {

    it("Should deletes the added comment and returns `true`", async () => {
        const comment = fakeComments[0];
        await ProductsCommentsModel.create({ productId, comments: [comment] })
        const response = await request(server).delete(routePath).send({ commentId: comment.id })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        const { comments } = await ProductsCommentsModel.findOne({ productId }, { comments: true })
        expect(comments.length).toBe(0)
    })

    it("Should returns `false` with status code 400", async () => {
        const comment = fakeComments[0];
        const response = await request(server).delete(routePath).send({ commentId: comment.id })
        expect(response.statusCode).toBe(400)
        expect(response.body).toBe(false)
    })

})