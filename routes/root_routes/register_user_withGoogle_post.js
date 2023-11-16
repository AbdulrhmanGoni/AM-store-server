import SystemController from "../../controllers/system-controller/SystemController.js";


export default async function register_user_withGoogle_post(req, res) {
    try {
        const response = await SystemController.registerUserWithGoogle(req.body);
        response && res.status(201).json({ ok: true, payload: response });
        response == false && res.status(200).json(false);
        !response && res.status(400).json();
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
}
