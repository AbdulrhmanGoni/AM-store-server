import { model, Schema } from "mongoose";
import timeAgo from "../functions/timeAgo.js";


const CommentsSchema = new Schema({
    productId: { type: String },
    commenterId: { type: Object },
    commenterData: { type: Object },
    targetId: { type: String },
    targetData: { type: Object },
    text: { type: String },
    likes: { type: Array },
    dislikes: { type: Array },
    replies: { type: Array || Boolean },
    createdAt: { type: Date },
    isNewComment: { type: Boolean },
    isNewReply: { type: Boolean }
},
    {
        timestamps: true,
        virtuals: {
            timeAgo: {
                get() { return timeAgo(this.createdAt); }
            }
        },
        toJSON: { virtuals: true }
    }
);


const CommentsModule = model("comments", CommentsSchema);

export default CommentsModule;