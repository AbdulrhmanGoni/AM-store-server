import FeedbacksModel from "../../../src/models/Feedbacks.js"
import { ObjectId } from "../../../src/utilities/schemaTypesOptions.js"
import fakesFeedbacks from "../../fakes/fakesFeedbacks.js"
import { userRequest, closeTestingServer, anyRequest } from "../../helpers/testRequest.js"

afterAll(async () => {
    await closeTestingServer()
})

afterEach(async () => {
    await FeedbacksModel.deleteMany({})
})

const routePath = `/api/feedbacks`

describe("POST /api/feedbacks", () => {

    it("Should adds user's feedback and returns \"We received your feedback,...\" message", async () => {
        const fakeFeedback = fakesFeedbacks[0]
        const requestOptions = { body: fakeFeedback, userId: fakeFeedback.userId }
        const reesponse = await userRequest(routePath, "post", requestOptions);
        expect(reesponse.statusCode).toBe(200);
        expect(reesponse.body.message).toMatch("We received your feedback");
        const theAddedFeedback = await FeedbacksModel.findOne({});
        expect(theAddedFeedback).toMatchObject({
            _id: expect.any(ObjectId),
            subject: fakeFeedback.subject,
            body: fakeFeedback.body
        })
        expect(theAddedFeedback.userId.toString()).toBe(fakeFeedback.userId);
    })

    it("Should adds an anonymous feedback and returns \"We received your feedback,...\" message", async () => {
        const fakeFeedback = fakesFeedbacks[0];
        const requestBody = {
            subject: fakeFeedback.subject,
            body: fakeFeedback.body
        };
        const reesponse = await anyRequest(routePath, "post", requestBody);
        expect(reesponse.statusCode).toBe(200);
        expect(reesponse.body.message).toMatch("We received your feedback");
        const theAddedFeedback = await FeedbacksModel.findOne({});
        expect(theAddedFeedback).toMatchObject({
            _id: expect.any(ObjectId),
            subject: fakeFeedback.subject,
            body: fakeFeedback.body
        });
        expect(theAddedFeedback.userId).toBeUndefined();
    })

})