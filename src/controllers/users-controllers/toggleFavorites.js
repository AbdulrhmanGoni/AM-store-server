import UserModel from "../../models/Users.js";


export default async function toggleFavorites(userId, productId) {
    try {
        let isToggled = false;
        const filter = { _id: userId, userFavorites: { $in: [productId] } };
        const update = { userFavorites: productId };
        const { modifiedCount } = await UserModel.updateOne(filter, { $pull: update });
        if (modifiedCount) isToggled = true;
        else {
            const { modifiedCount } = await UserModel.updateOne({ _id: userId }, { $push: update });
            if (modifiedCount) isToggled = true;
            else isToggled = false;
        }

        return isToggled;
    } catch (error) {
        console.log(error)
        return null;
    }
}
