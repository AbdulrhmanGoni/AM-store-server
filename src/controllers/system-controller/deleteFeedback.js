import { Types } from "mongoose";
import FeedbacksModel from "../../models/Feedbacks.js";

export default async function deleteFeedback(feedbackId) {
    try {
        const { deletedCount } = await FeedbacksModel.deleteOne({ _id: new Types.ObjectId(feedbackId) });
        return !!deletedCount
    } catch (error) {
        console.log(error)
        return;
    }
}