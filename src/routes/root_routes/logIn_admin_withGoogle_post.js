import SystemController from "../../controllers/system-controller/SystemController.js";

export default async function logIn_admin_withGoogle_post(req, res) {
    try {
        const { googleUserAccessToken } = req.body;
        const response = await SystemController.logInAdminWithGoogle(googleUserAccessToken);
        if (response === undefined) res.status(400).json();
        else res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
}
