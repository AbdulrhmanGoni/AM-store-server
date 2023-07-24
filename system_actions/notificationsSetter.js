
import NotificationsModel from "../../../models/Notifications.js"

async function notificationsSetter(notification) {
    try {
        await new NotificationsModel(notification).save()
    } catch (err) {

    }
}