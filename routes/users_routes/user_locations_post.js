import UsersController from "../../controllers/users-controllers/UsersController.js";

export default async function user_locations_post(req, res) {
    const { addLocation, setSelectedLocation } = UsersController;
    const { userId } = req.params;
    const { theLocation, type } = req.body;
    try {
        if (type === "addNewLocation") {
            const respond = await addLocation(userId, theLocation);
            const respond2 = await setSelectedLocation(userId, theLocation);
            res.status(200).json(!!(respond && respond2));
        } else {
            const respond = await setSelectedLocation(userId, theLocation);
            res.status(200).json(respond);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
