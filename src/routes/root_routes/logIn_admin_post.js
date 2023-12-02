import SystemController from "../../controllers/system-controller/SystemController.js";


export default async function logIn_admin_post(req, res) {
    try {
        const { adminEmail, adminPassword } = req.body;
        const response = await SystemController.logInAdmin({ adminEmail, adminPassword });
        response && res.status(200).json(response);
        response == false && res.status(200).json(false);
        response == null && res.status(200).json(null);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
