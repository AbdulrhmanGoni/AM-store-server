import jwt from "jsonwebtoken";
import UserModel from "../models/Users.js";

const user_logIn_withGoogle = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const userData = await UserModel.findOne({ userEmail }, { userPassword: true });
        if (userData) {
            if (userData?.userPassword === "Signed up with Google") {
                const userId = userData._id;
                const token = jwt.sign({ userId, role: "user" }, process.env.JWT_SECRET_KEY)
                return res.status(200).json({ userId, accessToken: token });
            } else return res.status(200).json(false);
        }
        return res.status(200).json(null);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default user_logIn_withGoogle;