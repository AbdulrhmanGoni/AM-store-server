import SystemController from "../../controllers/system-controller/SystemController.js"

export default async function notifications_post(req, res) {
    try {
        const { body: { notificationsIds }, adminId } = req;
        const response = await SystemController.setNotificationsAsRead(notificationsIds, adminId);
        res.status(response ? 200 : 400).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json();
    }
}