import SystemController from "../../controllers/system-controller/SystemController.js";


export default async function logIn_admin_post(req, res) {
    try {
        const { adminEmail, adminPassword } = req.body;
        const { status, response } = await SystemController.logInAdmin({ adminEmail, adminPassword });
        res.status(status).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Unexpected Error" });
    }
}
