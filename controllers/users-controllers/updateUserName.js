import UserModel from "../../models/Users.js";
import { userDataTypes } from "../../CONSTANT/projections.js";


export default async function updateUserName(userId, newName) {
    try {
        const { userName } = await UserModel.findByIdAndUpdate(userId,
            { $set: { userName: newName } },
            { new: true, projection: userDataTypes.userName }
        );
        return userName;
    } catch (error) {
        console.log(error);
        return null;
    }
}