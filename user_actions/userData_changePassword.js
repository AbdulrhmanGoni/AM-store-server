import { userDataTypes } from "../CONSTANT/projections.js";
import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";

const { compare, hashSync } = bcrypt;

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