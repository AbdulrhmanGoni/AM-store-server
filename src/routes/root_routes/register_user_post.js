import SystemController from "../../controllers/system-controller/SystemController.js"


export default async function register_user_post(req, res) {
    try {
        const response = await SystemController.registerUser(req.body);
        response && res.status(200).json(response);
        !response && res.status(400).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
}
