import bcryptjs from "bcryptjs"
import UserModel from "../models/Users.js";
import { userDataTypes } from "../CONSTANT/dataTypes.js";

export default async function passwordChecker(req, res) {
    try {
        const { userPassword } = await UserModel.findById(req.params.userId, userDataTypes.password);
        const result = await bcryptjs.compare(req.body.unHashedPassword, userPassword);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}