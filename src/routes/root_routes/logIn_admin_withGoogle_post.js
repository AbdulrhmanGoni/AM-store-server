import SystemController from "../../controllers/system-controller/SystemController.js";

export default async function logIn_admin_withGoogle_post(req, res) {
    try {
        const { googleUserCredentials } = req.body;
        const { status, response } = await SystemController.logInAdminWithGoogle(googleUserCredentials);
        res.status(status).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
}
