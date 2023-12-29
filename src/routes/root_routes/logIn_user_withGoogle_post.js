import SystemController from "../../controllers/system-controller/SystemController.js";

export default async function logIn_user_withGoogle_post(req, res) {
    try {
        const { googleUserAccessToken } = req.body;
        const response = await SystemController.logInUserWithGoogle(googleUserAccessToken);
        res.status(response.status).json(response.response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There is unexpected server error happened" });
    }
}
