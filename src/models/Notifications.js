import { Schema, model } from "mongoose";
import getTheDateAfterNDays from "../utilities/getTheDateAfterNDays.js";
import { ArrayOfObjectIds, RequiredString } from "../utilities/schemaTypesOptions.js";

const NotificationsSchema = new Schema(
    {
        type: {
            type: String,
            enum: ["success", "error", "info", "warning"],
            required: true
        },
        title: RequiredString({ maxLength: 100 }),
        diecription: {
            type: String,
            maxLength: 200
        },
        readBy: ArrayOfObjectIds(),
        expiresAt: {
            type: Date,
            default: getTheDateAfterNDays(15).toISOString(),
            expires: 1296000 // expires after 15 days
        }
    },
    { timestamps: true, versionKey: false }
)

const NotificationsModel = model("notifications", NotificationsSchema);

export default NotificationsModel;
