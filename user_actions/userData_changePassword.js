import { userDataTypes } from "../CONSTANT/dataTypes.js";
import UserModel from "../models/Users.js";
import bcryptjs from "bcryptjs";

const { compare, hashSync } = bcryptjs;

const userData_changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const _id = req.params.userId;
        const newPasswordHashed = await hashSync(newPassword);
        const { userPassword } = await UserModel.findById(_id, userDataTypes.password);
        const result = await compare(currentPassword, userPassword);
        result && await UserModel.updateOne({ _id, userPassword },
            { $set: { userPassword: newPasswordHashed } }
        );
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default userData_changePassword;