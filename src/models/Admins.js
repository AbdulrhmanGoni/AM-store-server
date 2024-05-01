import { Schema, model } from "mongoose";
import { Email, Password, PersonName } from "../utilities/schemaTypesOptions.js";
import defaultAdmin from "../configuration/defaultAdmin.js";

const AdminSchema = new Schema(
    {
        adminName: PersonName(),
        adminEmail: Email(),
        adminPassword: Password(),
        avatar: String,
        signingMethod: {
            type: String,
            default: "Email and Password"
        }
    },
    { timestamps: true, versionKey: false }
);

const AdminModel = model("admins", AdminSchema);

try {
    AdminModel.count()
        .then((count) => {
            if (!count) {
                new AdminModel(defaultAdmin).save()
            }
        })
} catch { }

export default AdminModel;
