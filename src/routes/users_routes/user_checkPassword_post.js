import UsersController from '../../controllers/users-controllers/UsersController.js';
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function user_checkPassword_post(req, res) {
        const result = await UsersController.passwordChecker(req.userId, req.body.password);
        if (result.status) res.status(200).json({ ok: true });
        else res.status(400).json(result);
    }
)