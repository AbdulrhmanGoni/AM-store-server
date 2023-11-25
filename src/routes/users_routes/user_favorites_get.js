import { userDataTypes } from "../../CONSTANT/projections.js";
import UsersController from "../../controllers/users-controllers/UsersController.js";

export default async function user_favorites_get(req, res) {
    try {
        const
            id = req.params.userId,
            projections = userDataTypes.userFavorites

        const respond = await UsersController.getFavorites(id, projections);
        res.status(200).json(respond);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}