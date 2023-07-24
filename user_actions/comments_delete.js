import { Types } from "mongoose";
import CommentsModule from "../models/Comments.js";

const comments_delete = async (req, res) => {
    const { commentId, replyPlace, commenterId, type } = req.body;
    try {
        if (type === "reply") {
            const comment_id = new Types.ObjectId(commentId);
            const { acknowledged } = await CommentsModule.updateOne(
                { _id: replyPlace, "replies._id": comment_id },
                { $pull: { replies: { _id: comment_id } } });

            if (acknowledged) {
                res.status(200).json(req.body);
            } else res.status(200).json(false);
        } else {
            const { acknowledged } = await CommentsModule.deleteOne({ _id: commentId, commenterId });
            if (acknowledged) {
                res.status(200).json(req.body);
            } else res.status(200).json(false);
        }
    } catch { res.status(400).json(null) }
}

export default comments_delete;