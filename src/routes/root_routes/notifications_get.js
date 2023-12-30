import SystemController from "../../controllers/system-controller/SystemController.js";
import eventEmiter from "../../utilities/eventEmiter.js";

const notificationsReceivers = [];

eventEmiter.on("notification", (notification) => {
    notificationsReceivers.forEach((notificationsReceiver) => {
        notificationsReceiver.sendNotification(notification)
    })
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

        const lastIndex = notificationsReceivers.length
        notificationsReceivers.push({
            sendNotification(notification) {
                res.write(`data: ${JSON.stringify(notification)}\n\n`)
            }
        })

        res.on("close", () => {
            delete notificationsReceivers[lastIndex]
        })

    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}
