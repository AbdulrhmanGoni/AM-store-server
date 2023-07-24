import comments_getComments from "./comments_getComments.js";
import comments_getReplies from "./comments_getReplies.js";

const comments_get = async (req, res) => {
    switch (req.query.get) {
        case "replies":
            comments_getReplies(req, res);
            break;

        default:
            comments_getComments(req, res);
            break;
    }
}

export default comments_get;