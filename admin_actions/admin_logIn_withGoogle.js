import AdminModel from "../models/Admins.js";
import jwt from "jsonwebtoken";

const admin_logIn_withGoogle = async (req, res) => {
    try {
        const { adminEmail } = req.body;
        const adminData = await AdminModel.findOne({ adminEmail }, { createdAt: 0, updatedAt: 0 })
        if (adminData) {
            if (adminData.adminPassword === "Signed up with Google") {
                const token = jwt.sign({ adminId: adminData._id, role: "admin" }, process.env.JWT_SECRET_KEY)
                adminData.adminPassword = undefined
                return res.status(200).json({ adminData, accessToken: token });
            } else return res.status(200).json(false);
        }
        return res.status(200).json(null);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default admin_logIn_withGoogle;