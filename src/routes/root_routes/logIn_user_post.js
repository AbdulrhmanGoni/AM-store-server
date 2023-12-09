import SystemController from "../../controllers/system-controller/SystemController.js";

export default async function logIn_user_post(req, res) {
    try {
        const { userEmail, userPassword } = req.body;
        const response = await SystemController.logInUser({ userEmail, userPassword });
        if (response.status) res.status(200).json(response);
        else res.status(400).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "There is unexpected error" });
    }
}
