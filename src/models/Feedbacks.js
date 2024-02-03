import { model, Schema } from "mongoose";
import { RequiredString, ObjectId } from "../utilities/schemaTypesOptions.js";

const FeedbacksSchema = new Schema(
    {
        subject: RequiredString({ maxLength: 100 }),
        body: RequiredString({ maxLength: 500 }),
        userId: ObjectId
    },
    { timestamps: true, versionKey: false }
)

const FeedbacksModel = model("feedbacks", FeedbacksSchema);

export default FeedbacksModel;
