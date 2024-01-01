import FeedbacksModel from "../../models/Feedbacks.js";
import eventEmiter from "../../utilities/eventEmiter.js";
import messageResponse from "../../utilities/messageResponse.js";

export default async function addFeedback(feedback) {
    try {
        const newFeedback = new FeedbacksModel(feedback);
        const response = await newFeedback.save()
            .then((feedback) => {
                eventEmiter.emit("feedback", feedback);
                return true
            })
            .catch((error) => {
                console.log(error)
                return;
            })

        const message =
            response ? "We received your feedback, Thank you for using our store"
                : "Something wrong happened"
        return messageResponse(message, response ? 200 : 400)
    } catch (error) {
        console.log(error)
        return messageResponse("Unexpected Error")
    }
}