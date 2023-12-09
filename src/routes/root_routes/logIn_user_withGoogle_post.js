import SystemController from "../../controllers/system-controller/SystemController.js";

export default async function logIn_user_withGoogle_post(req, res) {
    try {
        const { googleUserAccessToken } = req.body;
        const response = await SystemController.logInUserWithGoogle(googleUserAccessToken);
        if (response.status) res.status(200).json(response);
        else res.status(400).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "There is unexpected error happened" });
    }
}
