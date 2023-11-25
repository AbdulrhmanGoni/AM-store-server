import UsersController from '../../controllers/users-controllers/UsersController.js';


export default async function user_post(req, res) {
    const { updateUserName, changePassword } = UsersController;
    const id = req.params.userId;

    try {
        switch (req.body.type) {
            case "changeUserName": {
                const respond = await updateUserName(id, req.body.newName);
                res.status(respond ? 200 : 400).json(respond ?? null);
                break;
            }

            case "changeUserPassword": {
                const respond = await changePassword(req, req.body);
                res.status(respond ? 200 : 400).json(respond ?? null);
                break;
            }

            default: res.status(400).json(null); break;
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(null);
    }
}
