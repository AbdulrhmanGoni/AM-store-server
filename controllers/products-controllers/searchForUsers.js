import UserModel from "../../models/Users.js";
import createProjection from "../../functions/createProjection.js";

async function searchForUsers(req, res) {
    const { userEmail, userName, limit, returnType } = req.query;
    const userReg = new RegExp(userName, "i");
    const emailReg = new RegExp(userEmail, "i");
    const projection = createProjection(returnType)

    try {
        const users = await UserModel
            .find({ userEmail: emailReg, userName: userReg }, projection, { limit })
        res.status(200).json(users);
    } catch {
        res.status(400).json(null);
    }
}

export default searchForUsers;