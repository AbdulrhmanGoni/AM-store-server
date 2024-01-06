import { Schema, model } from "mongoose";
import { Email, Password, PersonName } from "../utilities/schemaTypesOptions.js";

const AdminSchema = new Schema({
    adminName: PersonName(),
    adminEmail: Email(),
    adminPassword: Password(),
    avatar: String,
    superAdmin: {
        type: Boolean,
        default: false
    },
    signingMethod: {
        type: String,
        default: "Email and Password"
    }
},
    { timestamps: true }
);

const AdminModel = model("admins", AdminSchema);
export default AdminModel;
