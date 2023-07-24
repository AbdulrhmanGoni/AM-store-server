import { userDataTypes } from "../CONSTANT/dataTypes.js";
import CommentsModule from "../models/Comments.js";
import UserModel from "../models/Users.js";

const comments_getComments = async (req, res) => {
    try {
        const { productId } = req.params;
        const comments = await CommentsModule.find({ productId }, { replies: false });
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            const { replies } = await CommentsModule.findById(comment._id, { replies: { _id: true } });
            const userData = await UserModel.findById(comment.commenterId, userDataTypes.comment);
            comment.commenterData = userData;
            comment.replies = replies;
        }
        res.status(200).json(comments)
    } catch { res.status(400).json([]) }
}

export default comments_getComments;