import FeedbacksModel from "../../models/Feedbacks.js";
import toObjectId from "../../utilities/toObjectId.js";

export default async function deleteFeedback(feedbackId) {
    try {
        const { deletedCount } = await FeedbacksModel.deleteOne({ _id: toObjectId(feedbackId) });
        return !!deletedCount
    } catch (error) {
        console.log(error)
        return;
    }
}