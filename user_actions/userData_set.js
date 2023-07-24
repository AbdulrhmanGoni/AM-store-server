import userData_changeName from "./userData_changeName.js";
import userData_changePassword from "./userData_changePassword.js";

const userData_set = async (req, res) => {
    switch (req.body.type) {
        case "changeUserName":
            userData_changeName(req, res);
            break;

        case "changeUserPassword":
            userData_changePassword(req, res);
            break;
        default:
            res.status(400).json(null);
            break;
    }
}

export default userData_set;
