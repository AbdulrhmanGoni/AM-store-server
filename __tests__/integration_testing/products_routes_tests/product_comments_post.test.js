import request from "supertest"
import mongoose from "mongoose"
import server from "../../../src/server.js"
import ProductsCommentsModel from "../../../src/models/ProductsComments.js"
import { getRandomProduct } from "../../fakes/fakesProducts.js"
import isValidUUID from "../../helpers/isValidUUID.js"

afterAll(async () => {
    await ProductsCommentsModel.deleteMany({})
    await mongoose.disconnect()
    server.close()
})

const { _id: productId } = getRandomProduct();
const routePath = `/api/products/${productId}/comments`

describe("Test 'product_comments_post' route handler", () => {
    it("Should returns the id of the added comment", async () => {
        const commenterId = "6442ea0558a819df70390175"
        const response = await request(server)
            .post(routePath)
            .send({ comment: { commenterId, text: "Testing comment" } })

        expect(response.statusCode).toBe(200)
        expect(isValidUUID(response.body)).toBe(true)
        const { comments } = await ProductsCommentsModel.findOne({ productId }, { comments: true })
        expect(comments[0]).toHaveProperty("id", response.body)
        expect(comments[0]).toHaveProperty("text", "Testing comment")
    })
})