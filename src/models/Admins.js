import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
    adminName: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    avatar: String,
    signingMethod: {
        type: String,
        default: "Email and Password"
    }
},
    { timestamps: true }
);

const AdminModel = model("admins", AdminSchema);
export default AdminModel;
