import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
    adminName: { type: String },
    adminEmail: { type: String },
    adminPassword: { type: String },
    avatar: { type: String }
},
    { timestamps: true }
);

const AdminModel = model("admins", AdminSchema);
export default AdminModel;
