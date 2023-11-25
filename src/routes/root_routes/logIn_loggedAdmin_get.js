import SystemController from "../../controllers/system-controller/SystemController.js";

export default async function logIn_loggedAdmin_get(req, res) {
    try {
        const adminData = await SystemController.loggedAdmin(req.adminId);
        adminData && res.status(200).json(adminData);
        !adminData && res.status(400).json();
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}