import UsersController from '../../controllers/users-controllers/UsersController';

export default async function user_locations_delete(req, res) {
    try {
        const { locationId } = req.body;
        const response = await UsersController.deleteLocation(req.params.userId, locationId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(null);
    }
}
