import NotificationsModel from "../../models/Notifications.js"
import toObjectId from "../../utilities/toObjectId.js"

export default async function setNotificationsAsRead(notificationsIds, adminId) {
    try {
        const updateQuery = { $addToSet: { readBy: toObjectId(adminId) } }
        const result = await NotificationsModel.updateMany({ _id: { $in: notificationsIds } }, updateQuery)
        return !!result.modifiedCount
    } catch (error) {
        console.log(error)
        return;
    }
}
