import { userDataTypes } from "../CONSTANT/dataTypes.js";
import UserModel from "../models/Users.js";

const userData_uploadAvatar = async (req, res) => {
    try {
        const { avatar } = await UserModel.findByIdAndUpdate(req.params.userId,
            { $set: { avatar: req.body.avatarUrl } },
            { new: true, projection: userDataTypes.avatar }
        );
        res.status(avatar ? 200 : 400).json(avatar ?? false);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default userData_uploadAvatar;