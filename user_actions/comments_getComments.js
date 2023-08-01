import { userDataTypes } from "../CONSTANT/dataTypes.js";
import CommentsModule from "../models/Comments.js";
import UserModel from "../models/Users.js";

const comments_getComments = async (req, res) => {
    try {
        const { productId } = req.params;
        const { sliceNumber, sliceSize } = req.query;
        const range = +sliceNumber * +sliceSize;
        const comments = await CommentsModule.find({ productId }, { replies: false }, { skip: range, limit: +sliceSize + 1 });
        const thereIsMore = !!comments[sliceSize];
        const loopLength = +sliceSize + 1 == comments.length ? +sliceSize : comments.length;
        for (let i = 0; i < loopLength; i++) {
            const comment = comments[i];
            const { replies } = await CommentsModule.findById(comment._id, { replies: { _id: true } });
            const userData = await UserModel.findById(comment.commenterId, userDataTypes.comment);
            comment.commenterData = userData;
            comment.replies = replies;
        }
        res.status(200).json({ comments: comments.slice(0, thereIsMore ? -1 : undefined), thereIsMore });
    } catch (err) {
        res.status(400).json({})
    }
}

export default comments_getComments;