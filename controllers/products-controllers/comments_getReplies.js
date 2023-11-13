import CommentsModule from "../../models/Comments.js";
import UserModel from "../../models/Users.js";
import timeAgo from "../../functions/timeAgo.js";
import { userDataTypes } from "../../CONSTANT/projections.js";


const comments_getReplies = async (req, res) => {
    try {
        const { commentId } = req.query;
        const { productId } = req.params;
        const { replies } = await CommentsModule.findOne({ _id: commentId, productId }, { replies: true });
        for (let i = 0; i < replies.length; i++) {
            const reply = replies[i];
            reply.timeAgo = timeAgo(reply.createdAt);
            const userData = await UserModel.findById(reply.commenterId, userDataTypes.comment);
            reply.commenterData = userData;
            if (reply.targetId) {
                const targetData = await UserModel.findById(reply.targetId, userDataTypes.userName);
                reply.targetData = targetData;
            }
        }
        res.status(200).json(replies);
    } catch (err) {
        console.log(err)
        res.status(400).json([])
    }
}

export default comments_getReplies;