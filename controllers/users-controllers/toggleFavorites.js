import UserModel from "../../models/Users.js";


export default async function toggleFavorites(userId, productId) {
    try {
        let isToggled = false;
        const filter = { _id: userId, userFavorites: { $in: [productId] } };
        const updateQuery = { userFavorites: productId };
        const { matchedCount } = await UserModel.updateOne(filter, { $pull: updateQuery });
        if (matchedCount) isToggled = true;
        else {
            const { matchedCount } = await UserModel.updateOne({ _id: userId }, { $push: updateQuery });
            if (matchedCount) isToggled = true;
            else isToggled = false;
        }

        return isToggled;
    } catch (error) {
        console.log(error)
        return null;
    }
}
