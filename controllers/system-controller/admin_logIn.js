import AdminModel from "../../models/Admins.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const admin_logIn = async (req, res) => {
    try {
        const { adminEmail, adminPassword } = req.body;
        const adminData = await AdminModel.findOne({ adminEmail }, { createdAt: 0, updatedAt: 0 })
        if (adminData) {
            if (adminData.adminPassword === "Signed up with Google") {
                return res.status(200).json(false);
            } else {
                const pass = bcrypt.compareSync(adminPassword, adminData.adminPassword);
                if (pass) {
                    const token = jwt.sign({ adminId: adminData._id, role: "admin" }, process.env.JWT_SECRET_KEY)
                    adminData.adminPassword = undefined
                    return res.status(200).json({ adminData, accessToken: token });
                }
            }
        }
        return res.status(200).json(null);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default admin_logIn;