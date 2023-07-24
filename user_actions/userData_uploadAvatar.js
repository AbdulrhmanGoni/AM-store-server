import UserModel from "../models/Users.js";

const userData_uploadAvatar = async (req, res) => {
    try {
        const { avatar } = await UserModel.findByIdAndUpdate(req.params.userId,
            { $set: { avatar: req.body.uploadedAvatar } },
            { new: true, projection: { avatar: true } }
        );
        res.status(200).json(avatar);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default userData_uploadAvatar;