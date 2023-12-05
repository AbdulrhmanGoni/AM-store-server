import SystemController from "../../controllers/system-controller/SystemController.js";


export default async function register_user_withGoogle_post(req, res) {
    try {
        const { googleUserAccessToken } = req.body;
        const response = await SystemController.registerUserWithGoogle(googleUserAccessToken);
        res.status(response ? 200 : 400).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
}
