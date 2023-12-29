import NotificationsModel from "../../models/Notifications.js";
import toObjectId from "../../utilities/toObjectId.js";

export default async function getNotifications(adminId) {
    try {
        return await NotificationsModel.find({ readBy: { $nin: [toObjectId(adminId)] } });
    } catch (error) {
        console.log(error)
        return;
    }
}
