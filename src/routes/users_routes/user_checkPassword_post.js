import UsersController from '../../controllers/users-controllers/UsersController.js';

export default async function user_checkPassword_post(req, res) {
    try {
        const result = await UsersController.passwordChecker(req.userId, req.body.password);
        if (result.status) res.status(200).json({ ok: true });
        else res.status(400).json(result);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Unexpected Error !" });
    }
}
