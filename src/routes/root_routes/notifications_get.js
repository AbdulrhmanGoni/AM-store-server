import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";
import eventEmiter from "../../utilities/eventEmiter.js";

const notificationsReceivers = [];

eventEmiter.on("notification", (notification) => {
    notificationsReceivers.forEach((receiver) => {
        receiver(notification)
    })
})

export default asyncRouteHandler(
    async function notifications_get(req, res) {
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
    }
)
