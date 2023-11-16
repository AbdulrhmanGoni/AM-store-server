import UsersController from "../../controllers/users-controllers/UsersController.js";

export default async function user_count_get(_, res) {
    try {
        res.status(200).json(await UsersController.usersCount());
    } catch (error) {
        res.status(400).json(null);
    }
}