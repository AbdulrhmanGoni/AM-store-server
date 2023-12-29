import { Types } from "mongoose"
import NotificationsModel from "../../models/Notifications.js"

export default async function setNotificationsAsRead(notificationsIds, adminId) {
    try {
        const updateQuery = { $addToSet: { readBy: new Types.ObjectId(adminId) } }
        const result = await NotificationsModel.updateMany({ _id: { $in: notificationsIds } }, updateQuery)
        return !!result.modifiedCount
    } catch (error) {
        console.log(error)
        return;
    }
}
