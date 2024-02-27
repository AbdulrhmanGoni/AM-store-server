import FeedbacksModel from "../../../src/models/Feedbacks.js"
import fakesFeedbacks from "../../fakes/fakesFeedbacks.js"
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"

afterAll(async () => {
    await FeedbacksModel.deleteMany({})
    await closeTestingServer()
})

beforeAll(async () => {
    // insert three feedbacks
    await FeedbacksModel.insertMany(fakesFeedbacks);
})

const routePath = (sliceNumber, sliceSize) => `/api/feedbacks?sliceNumber=${sliceNumber}&sliceSize=${sliceSize}`

describe("GET /api/feedbacks?sliceNumber&sliceSize", () => {

    it("Should returns an array of three feedbacks with `thereIsMore: false`", async () => {
        const reesponse = await adminRequest(routePath(1, 3), "get");
        expect(reesponse.statusCode).toBe(200);
        expect(reesponse.body.thereIsMore).toBe(false);
        expect(reesponse.body.feedbacks.length).toBe(3);
        reesponse.body.feedbacks.forEach((feedback) => {
            expect(feedback).toMatchObject({
                _id: expect.any(String),
                subject: expect.any(String),
                body: expect.any(String),
                createdAt: expect.any(String)
            })
        })
    })

    it("Should returns an array of one feedback with `thereIsMore: true`", async () => {
        const reesponse = await adminRequest(routePath(1, 1), "get");
        expect(reesponse.statusCode).toBe(200);
        expect(reesponse.body.thereIsMore).toBe(true);
        expect(reesponse.body.feedbacks.length).toBe(1);
        reesponse.body.feedbacks.forEach((feedback) => {
            expect(feedback).toMatchObject({
                _id: expect.any(String),
                subject: expect.any(String),
                body: expect.any(String),
                createdAt: expect.any(String)
            })
        })
    })

    it("Should returns an empty array with `thereIsMore: true`", async () => {
        const reesponse = await adminRequest(routePath(2, 3), "get");
        expect(reesponse.statusCode).toBe(200);
        expect(reesponse.body.thereIsMore).toBe(false);
        expect(reesponse.body.feedbacks.length).toBe(0);
    })

})