import UsersController from '../../controllers/users-controllers/UsersController';

export default async function user_password_post(req, res) {
    try {
        const
            id = req.params.userId,
            password = req.body.unHashedPassword

        const result = await UsersController.passwordChecker(id, password);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
