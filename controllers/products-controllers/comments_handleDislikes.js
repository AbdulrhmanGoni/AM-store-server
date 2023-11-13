import mongoose from "mongoose";
import CommentsModule from "../../models/Comments.js";


const comments_handleDislikes = async (req, res) => {
    const { action: { commentId, userId, type, replyPlace } } = req.body;
    console.log("heree")
    if (type === "reply") {
        try {
            const comment_id = new mongoose.Types.ObjectId(commentId);
            const isDislikes = await CommentsModule.findOneAndUpdate(
                { _id: replyPlace, replies: { $elemMatch: { _id: comment_id, dislikes: { $in: [userId] } } } },
                { $pull: { "replies.$.dislikes": userId } }
            )
            if (!isDislikes) {
                console.log("isDislikes");
                await CommentsModule.updateOne(
                    { _id: replyPlace, "replies._id": comment_id },
                    {
                        $push: { "replies.$.dislikes": userId },
                        $pull: { "replies.$.likes": userId }
                    }
                )
            }
            res.status(200).json(true);
        } catch (err) { console.log(err); res.status(400).json(null) }
    } else {
        try {
            const dislikes = await CommentsModule.findOneAndUpdate(
                { _id: commentId, dislikes: { $in: [userId] } },
                { $pull: { dislikes: userId } }
            );
            if (!dislikes) {
                await CommentsModule.updateOne({ _id: commentId },
                    {
                        $push: { dislikes: userId },
                        $pull: { likes: userId }
                    }
                );
            }
            res.status(200).json(true);
        } catch (err) { console.log(err); res.status(400).json(null) }
    }
}

export default comments_handleDislikes;