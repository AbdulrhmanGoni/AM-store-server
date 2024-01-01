import SystemController from "../../controllers/system-controller/SystemController.js";
import eventEmiter from "../../utilities/eventEmiter.js";

const notificationsReceivers = [];

eventEmiter.on("notification", (notification) => {
    notificationsReceivers.forEach((receiver) => {
        receiver(notification)
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

        const receiverIndex = notificationsReceivers.length
        notificationsReceivers.push((notification) => {
            res.write(`data: ${JSON.stringify(notification)}\n\n`)
        })

        res.on("close", () => {
            delete notificationsReceivers[receiverIndex]
        })

    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}
