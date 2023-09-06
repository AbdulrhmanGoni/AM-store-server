import jwt from "jsonwebtoken";
import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";

const user_logIn = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const userData = await UserModel.findOne({ userEmail }, { userPassword: true });
        if (userData) {
            const pass = bcrypt.compareSync(userPassword, userData.userPassword);
            if (pass) {
                const token = jwt.sign({ userId: userData._id, role: "user" }, process.env.JWT_SECRET_KEY)
                return res.status(200).json({ userId: userData._id, accessToken: token });
            }
        }
        return res.status(200).json(false);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default user_logIn;