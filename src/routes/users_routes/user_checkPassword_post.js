import UsersController from '../../controllers/users-controllers/UsersController.js';

export default async function user_checkPassword_post(req, res) {
    const errorResponse = { message: "Unexpected Error !", status: false };
    const notAllowedMessage = "You have changed your password since less than a month, You can't change it again, Try again after a month since last change"
    try {
        const result = await UsersController.passwordChecker(req.userId, req.body.password);
        if (result) res.status(200).json(errorResponse);
        else {
            res.status(400).json({
                message: result == null ?
                    notAllowedMessage
                    : result == false ?
                        "Wrong password !, Try again"
                        : errorResponse.message
            })
        }
    } catch (error) {
        res.status(400).json(errorResponse);
    }
}
