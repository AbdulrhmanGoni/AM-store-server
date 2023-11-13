import AdminModel from "../../../models/Admins.js";

const admin_Logged = async (req, res) => {
    try {
        const adminData = await AdminModel.findById(req.adminId, { avatar: 1, adminName: 1, adminEmail: 1 });
        res.status(200).json(adminData);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default admin_Logged;