import UsersController from "../../controllers/users-controllers/UsersController.js";

export default async function user_locations_post(req, res) {
    const { addLocation, setSelectedLocation } = UsersController;
    const { userId } = req.params;
    const { theLocation, type } = req.body;
    try {
        if (type === "newSelected") {
            const respond = await setSelectedLocation(userId, theLocation);
            res.status(respond ? 200 : 400).json(respond);
        } else {
            const respond = await addLocation(userId, theLocation);
            res.status(respond ? 200 : 400).json(respond);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
