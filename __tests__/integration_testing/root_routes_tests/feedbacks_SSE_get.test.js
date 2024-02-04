import addFeedback from "../../../src/controllers/system-controller/addFeedback.js";
import FeedbacksModel from "../../../src/models/Feedbacks.js"
import fakesFeedbacks from "../../fakes/fakesFeedbacks.js";
import { closeTestingServer, createEventSource } from "../../helpers/testRequest.js"
import waitFor from "../../helpers/waitFor.js";

afterAll(async () => {
    await FeedbacksModel.deleteMany({});
    await closeTestingServer();
})

const routePath = "/api/feedbacks/receive-sse"

describe("Test 'feedbacks_SSE_get' route handler", () => {

    it("Should returns the new added feedback through `eventSource.onmessage`", async () => {
        const fakeFeedback = fakesFeedbacks[0];
        const eventSource = createEventSource(routePath);
        eventSource.onmessage = (messageEvent => {
            const data = JSON.parse(messageEvent.data);
            if (!(Array.isArray(data)) && data) {
                expect(data).toMatchObject(fakeFeedback);
            }
        })

        await waitFor(1);
        await addFeedback(fakeFeedback);
        await waitFor(1, () => { eventSource.close() });
    })

})