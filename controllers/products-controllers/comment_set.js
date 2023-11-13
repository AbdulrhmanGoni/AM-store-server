import comments_add from "./comments_add.js";
import comments_handleDislikes from "./comments_handleDislikes.js";
import comments_handleLikes from "./comments_handleLikes.js";
import comments_reply from "./comments_reply.js";


const comments_set = async (req, res) => {
    switch (req.body.type) {
        case "newComment":
            comments_add(req, res);
            break;

        case "like||dislike":
            switch (req.body.action.actionType) {
                case "like":
                    comments_handleLikes(req, res);
                    break;

                case "dislike":
                    comments_handleDislikes(req, res);
                    break;

                default:
                    res.status(405).json(null);
                    break;
            }
            break;

        case "reply":
            comments_reply(req, res);
            break;

        default:
            res.status(405).json(null);
            break;
    }
}

export default comments_set;