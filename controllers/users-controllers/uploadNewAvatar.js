import { userDataTypes } from "../../CONSTANT/projections.js";
import UserModel from "../../models/Users.js";

export default async function uploadNewAvatar(userId, avatarUrl) {
    try {
        const { avatar } = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { avatar: avatarUrl } },
            { new: true, projection: userDataTypes.avatar }
        );
        return avatar;
    } catch (error) {
        return null;
    }
}