import NotificationsModel from "../../models/Notifications.js";
import eventEmiter from "../../utilities/eventEmiter.js";

export default async function notifications_get(_req, res) {
    try {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        const notifications = await NotificationsModel.find({});
        res.write(`data: ${JSON.stringify(notifications)}\n\n`);

        eventEmiter.on("notification", (notification) => {
            res.write(`data: ${JSON.stringify(notification)}\n\n`);
        })

    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}
