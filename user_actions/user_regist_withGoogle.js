import { userDataTypes } from "../CONSTANT/dataTypes.js";
import UserModel from "../models/Users.js";
import jwt from "jsonwebtoken";


const user_regist_withGoogle = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const isExist = await UserModel.findOne({ userEmail }, userDataTypes.userEmail);
        if (isExist) {
            res.status(200).json(false);
        } else {
            const newUser = new UserModel(req.body);
            newUser.userPassword = "Signed up with Google";
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

export default user_regist_withGoogle;