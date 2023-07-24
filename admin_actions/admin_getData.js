import Admins from "../models/Admins";

const admin_getData = async (req, res) => {
    try {
        const adminData = await Admins.findById(req.params.adminId);
        res.status(200).json(adminData);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }

}

export default admin_getData;