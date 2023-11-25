import AdminModel from "../../models/Admins.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export default async function logInAdmin({ adminEmail, adminPassword }) {
    try {
        const adminData = await AdminModel.findOne({ adminEmail }, { createdAt: 0, updatedAt: 0 });
        if (adminData) {
            if (adminData.adminPassword === "Signed up with Google") {
                return false;
            } else {
                const pass = bcrypt.compareSync(adminPassword, adminData.adminPassword);
                if (pass) {
                    const token = jwt.sign(
                        { adminId: adminData._id, role: "admin" },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "30d" }
                    )
                    adminData.adminPassword = undefined;
                    return { adminData, accessToken: token };
                }
            }
        }
        return null;
    } catch (error) {
        console.log(error)
        return;
    }
}