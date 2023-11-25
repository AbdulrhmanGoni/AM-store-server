import SystemController from "../../controllers/system-controller/SystemController.js";

export default async function logIn_user_post(req, res) {
    try {
        const { userEmail, userPassword } = req.body;
        const response = await SystemController.logInUser({ userEmail, userPassword });
        if (response == null) res.status(400).json(null);
        else res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
