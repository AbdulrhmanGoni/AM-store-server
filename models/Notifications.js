import { Schema, model } from "mongoose"

const NotificationsSchema = new Schema({
    title: { type: String },
    diecription: { type: String },
    from: { type: String }
})

const NotificationsModel = model("notifications", NotificationsSchema);

export default NotificationsModel;