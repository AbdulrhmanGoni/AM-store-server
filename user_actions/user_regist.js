import { userDataTypes } from "../CONSTANT/dataTypes.js";
import UserModel from "../models/Users.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


const user_regist = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const isExist = await UserModel.findOne({ userEmail }, userDataTypes.userEmail);
        if (isExist) {
            res.status(200).json(false);
        } else {
            const newUser = new UserModel(req.body);
            const hashedPassword = await bcryptjs.hashSync(newUser.userPassword);
            newUser.userPassword = hashedPassword;
            await newUser.save();
            const token = jwt.sign({ id: userData._id, role: "user" }, process.env.JWT_SECRET_KEY)
            res.status(200).json(newUser);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default user_regist;