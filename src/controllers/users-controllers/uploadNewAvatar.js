import UsersModel from "../../models/Users.js";

export default async function uploadNewAvatar(userId, avatarUrl) {
    try {
        const { avatar } = await UsersModel.findByIdAndUpdate(
            userId,
            { $set: { avatar: avatarUrl } },
            { new: true, projection: { avatar: 1, _id: 0 } }
        );
        return avatar;
    } catch (error) {
        return null;
    }
}