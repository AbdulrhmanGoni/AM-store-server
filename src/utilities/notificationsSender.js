import NotificationsModel from "../models/Notifications.js";
import eventEmiter from "./eventEmiter.js";

export default async function notificationsSender(notification) {
    try {
        const newNotification = new NotificationsModel(notification)
        const response = await newNotification.save()
            .then((notification) => {
                eventEmiter.emit("notification", notification)
                return true
            })
            .catch((error) => {
                console.log(error)
                return false
            })
        return response
    } catch (error) {
        console.log(error)
        return false
    }
}
