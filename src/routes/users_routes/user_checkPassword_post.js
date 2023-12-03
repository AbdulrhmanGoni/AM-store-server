import UsersController from '../../controllers/users-controllers/UsersController.js';

export default async function user_checkPassword_post(req, res) {
    try {
        const id = req.params.userId
        const result = await UsersController.passwordChecker(id, req.body.password);
        if (result == null) { res.status(400).json(null) }
        else res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
