import UsersController from "../../controllers/users-controllers/UsersController.js";


export default async function user_locations_get(req, res) {
    try {
        const response = await UsersController.getLocations(req.params.userId);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
