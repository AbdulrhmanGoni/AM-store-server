import UsersModel from "../../models/Users.js";
import createProjection from "../../utilities/createProjection.js";

export default async function searchForUsers(query) {
    try {
        const { userEmail, userName, limit, returnType } = query;
        const userReg = new RegExp(userName, "i");
        const emailReg = new RegExp(userEmail, "i");
        const projection = createProjection(returnType);

        return await UsersModel.find({ userEmail: emailReg, userName: userReg }, projection, { limit })
    } catch {
        return null;
    }
}