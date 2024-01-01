import { model, Schema, Types } from "mongoose";

const FeedbacksSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    userId: Types.ObjectId
}, { timestamps: true })

const FeedbacksModel = model("feedbacks", FeedbacksSchema);

export default FeedbacksModel;
