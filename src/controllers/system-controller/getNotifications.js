import { Types } from "mongoose";
import NotificationsModel from "../../models/Notifications.js";

export default async function getNotifications(adminId) {
    try {
        return await NotificationsModel.find({ readBy: { $nin: [new Types.ObjectId(adminId)] } });
    } catch (error) {
        console.log(error)
        return;
    }
}
