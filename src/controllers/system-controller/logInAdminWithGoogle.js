import AdminModel from "../../models/Admins.js";
import jwt from "jsonwebtoken";


export default async function logInAdminWithGoogle({ adminEmail }) {
    try {
        const adminData = await AdminModel.findOne({ adminEmail }, { createdAt: 0, updatedAt: 0 });
        if (adminData) {
            if (adminData.adminPassword === "Signed up with Google") {
                const token = jwt.sign(
                    { adminId: adminData._id, role: "admin" },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "30d" }
                )
                adminData.adminPassword = undefined;
                return { adminData, accessToken: token };
            } else return false;
        }
        return null;
    } catch (error) {
        console.log(error);
        return;
    }
}