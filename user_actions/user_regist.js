import { userDataTypes } from "../CONSTANT/projections.js";
import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const user_regist = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const isExist = await UserModel.findOne({ userEmail }, userDataTypes.userEmail);
        if (isExist) {
            res.status(200).json(false);
        } else {
            const newUser = new UserModel(req.body);
            const hashedPassword = bcrypt.hashSync(newUser.userPassword, +process.env.HASHING_SALT_ROUNDS);
            newUser.userPassword = hashedPassword;
            !(await newUser.save().then(() => {
                const userId = newUser._id;
                const token = jwt.sign({ userId, role: "user" }, process.env.JWT_SECRET_KEY)
                const { userName, avatar } = newUser;
                res.status(200).json({ userData: { _id: userId, userEmail, userName, avatar }, token });
                return true
            })) && res.status(400).json(null)
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default user_regist;