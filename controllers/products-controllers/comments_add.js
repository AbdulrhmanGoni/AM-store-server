import { userDataTypes } from "../../CONSTANT/projections.js";
import CommentsModule from "../../models/Comments.js";
import UserModel from "../../models/Users.js";

const comments_add = async (req, res) => {
    try {
        const comment = await new CommentsModule(req.body.comment).save();
        const userData = await UserModel.findById(comment.commenterId, userDataTypes.comment);
        comment.commenterData = userData;
        comment.isNewComment = true;
        res.status(200).json(comment);
    }
    catch {
        res.status(400).json(null)
    }
}

export default comments_add;