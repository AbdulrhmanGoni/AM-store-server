import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
    adminName: { type: String },
    email: { type: String },
    password: { type: String },
    avatar: { type: String },
    role: { type: String }
}, { timestamps: true }
);

const AdminModel = model("admin", AdminSchema);
export default AdminModel;
