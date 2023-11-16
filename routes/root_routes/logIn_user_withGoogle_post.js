import SystemController from "../../controllers/system-controller/SystemController.js";


export default async function logIn_user_withGoogle_post(req, res) {
    try {
        const { userEmail } = req.body;
        const response = await SystemController.logInUserWithGoogle({ userEmail });
        response && res.status(200).json(response);
        response == false && res.status(200).json(false);
        response == null && res.status(200).json(null);
        !response && res.status(400).json(null);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
