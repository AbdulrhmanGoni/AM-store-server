import { Types } from "mongoose";
import CommentsModule from "../models/Comments.js";

const comments_handleLikes = async (req, res) => {
    const { action: { commentId, userId, type, replyPlace } } = req.body;
    if (type === "reply") {
        try {
            const comment_id = new Types.ObjectId(commentId);
            const isLikes = await CommentsModule.findOneAndUpdate(
                { _id: replyPlace, replies: { $elemMatch: { _id: comment_id, likes: { $in: [userId] } } } },
                { $pull: { "replies.$.likes": userId } }
            )
            if (!isLikes) {
                await CommentsModule.updateOne(
                    { _id: replyPlace, "replies._id": comment_id },
                    {
                        $push: { "replies.$.likes": userId },
                        $pull: { "replies.$.dislikes": userId }
                    }
                )
            }
            res.status(200).json(true);
        } catch (err) { console.log(err); res.status(400).json(null) }
    } else {
        try {
            const likes = await CommentsModule.findOneAndUpdate(
                { _id: commentId, likes: { $in: [userId] } },
                { $pull: { likes: userId } }
            );
            if (!likes) {
                await CommentsModule.updateOne({ _id: commentId },
                    {
                        $push: { likes: userId },
                        $pull: { dislikes: userId }
                    }
                );
            }
            res.status(200).json(true);
        } catch (err) { console.log(err); res.status(400).json(null) }
    }
}

export default comments_handleLikes;