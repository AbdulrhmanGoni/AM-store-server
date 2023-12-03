import UsersController from '../../controllers/users-controllers/UsersController.js';

export default async function user_updateUserName_post(req, res) {
    try {
        const respond = await UsersController.updateUserName(req.userId, req.body.newName);
        res.status(respond ? 200 : 400).json(respond);
    } catch (error) {
        console.log(error)
        res.status(400).json(null);
    }
}