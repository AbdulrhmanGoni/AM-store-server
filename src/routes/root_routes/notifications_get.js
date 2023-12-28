import SystemController from "../../controllers/system-controller/SystemController.js";
import eventEmiter from "../../utilities/eventEmiter.js";

const connectedAdmins = {};

eventEmiter.on("notification", (notification) => {
    for (const id in connectedAdmins) {
        connectedAdmins[id]?.(notification)
    }
})

export default async function notifications_get(req, res) {
    try {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        const notifications = await SystemController.getNotifications(req.adminId);
        res.write(`data: ${JSON.stringify(notifications)}\n\n`);

        connectedAdmins[req.adminId] = (notification) => {
            res.write(`data: ${JSON.stringify(notification)}\n\n`)
        };

    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}
