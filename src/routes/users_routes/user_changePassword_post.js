import UsersController from '../../controllers/users-controllers/UsersController.js';
import ErrorGenerator from '../../utilities/ErrorGenerator.js';

export default async function user_changePassword_post(req, res, next) {
    try {
        const respond = await UsersController.changePassword(req.userId, req.body);
        if (respond) {
            res.status(200).json(respond);
        } else {
            const message = respond == null
                ? "You have changed your password since less than a month, You can't change it again, Try again after a month since last change"
                : "Unexpected Error!"
            next(new ErrorGenerator(message, 400));
        }
    } catch (err) {
        console.log(err);
        next(new ErrorGenerator("Unexpected Error!", 400))
    }
}
