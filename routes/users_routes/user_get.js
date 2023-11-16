import { userDataTypes } from "../../CONSTANT/projections.js";
import UsersController from "../../controllers/users-controllers/UsersController.js";

export default async function user_get(req, res) {
    try {
        const
            id = req.params.userId,
            projection = userDataTypes[req.query.type ?? "basic"]

        const userData = UsersController.getUserData(id, projection);
        res.status(200).json(userData);
    } catch {
        res.status(400).json(null);
    }
}