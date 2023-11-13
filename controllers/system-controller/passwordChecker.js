import bcrypt from "bcrypt"
import UserModel from "../../models/Users.js";
import { userDataTypes } from "../../CONSTANT/projections.js";

export default async function passwordChecker(req, res) {
    try {
        const { userPassword } = await UserModel.findById(req.params.userId, userDataTypes.password);
        const result = await bcrypt.compare(req.body.unHashedPassword, userPassword);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}