import CommentsModule from "../models/Comments.js";
import UserModel from "../models/Users.js";
import { userDataTypes } from "../CONSTANT/dataTypes.js";

const comments_reply = async (req, res) => {
    try {
        const { comment, replyTo } = req.body;
        const newComment = new CommentsModule({ ...comment, createdAt: new Date().toISOString() });
        const { acknowledged } = await CommentsModule.updateOne({ _id: replyTo }, { $push: { replies: newComment } })
        if (acknowledged) {
            const userData = await UserModel.findById(newComment.commenterId, userDataTypes.comment);
            newComment.commenterData = userData;
            if (newComment.targetId) {
                const targetData = await UserModel.findById(newComment.targetId, userDataTypes.userName);
                newComment.targetData = targetData;
            }
            newComment.isNewReply = true;
            res.status(200).json(newComment);
        } else res.status(400).json(false);
    } catch { res.status(400).json(null) }
}

export default comments_reply;