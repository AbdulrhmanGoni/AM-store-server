import { userDataTypes } from "../CONSTANT/dataTypes.js";
import UserModel from "../models/Users.js";

const userData_changePassword = async (req, res) => {
    try {
        const { userPassword } = await UserModel.findByIdAndUpdate(req.params.userId,
            { $set: { userPassword: req.body.newPassword } },
            { new: true, projection: userDataTypes.password }
        );
        res.status(200).json(userPassword);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default userData_changePassword;