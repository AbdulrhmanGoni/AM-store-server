import FeedbacksModel from "../../../src/models/Feedbacks.js"
import fakesFeedbacks from "../../fakes/fakesFeedbacks.js";
import { adminRequest, closeTestingServer } from "../../helpers/testRequest.js"

afterAll(async () => {
    await FeedbacksModel.deleteMany({});
    await closeTestingServer();
})

const routePath = "/api/feedbacks"

describe("Test 'feedbacks_delete' route handler", () => {

    it("Should returns ", async () => {
        const feedbacks = await FeedbacksModel.insertMany(fakesFeedbacks);
        const feedbackToDelete = feedbacks[0]
        const requestOtions = { body: { feedbackId: feedbackToDelete._id } }
        const response = await adminRequest(routePath, "delete", requestOtions)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
        expect(await FeedbacksModel.find({})).not.toEqual(
            expect.arrayContaining(
                [expect.objectContaining({ _id: feedbackToDelete._id })]
            )
        )
    })

})