import UserModel from "../models/Users.js";
import { userDataTypes } from "../CONSTANT/projections.js";

const userData_changeName = async (req, res) => {
    try {
        const { userName } = await UserModel.findByIdAndUpdate(req.params.userId,
            { $set: { userName: req.body.newName } },
            { new: true, projection: userDataTypes.userName }
        );
        res.status(200).json(userName);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default userData_changeName;