import { userDataTypes } from "../../CONSTANT/projections.js";
import UserModel from "../../models/Users.js";
import { compareSync, hashSync } from "bcrypt";

const userData_changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const _id = req.params.userId;
        const { userPassword } = await UserModel.findById(_id, userDataTypes.password);
        const result = compareSync(currentPassword, userPassword);
        if (result) {
            const newPasswordHashed = hashSync(newPassword, +process.env.HASHING_SALT_ROUNDS);
            const { modifiedCount, matchedCount } = await UserModel.updateOne({ _id, userPassword },
                { $set: { userPassword: newPasswordHashed } }
            );
            res.status(200).json((modifiedCount && matchedCount));
        } else res.status(400).json(false);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default userData_changePassword;