import { Schema, Types, model } from "mongoose";
import getTheDateAfterNDays from "../utilities/getTheDateAfterNDays.js";

const NotificationsSchema = new Schema(
    {
        type: {
            type: String,
            enum: ["success", "error", "info", "warning"],
            required: true
        },
        title: {
            type: String,
            required: true
        },
        diecription: String,
        readBy: {
            type: [Types.ObjectId],
            default: []
        },
        expiresAt: {
            type: Date,
            default: getTheDateAfterNDays(15).toISOString(),
            expires: 1296000 // expires after 15 days
        }
    },
    { timestamps: true }
)

const NotificationsModel = model("notifications", NotificationsSchema);

export default NotificationsModel;