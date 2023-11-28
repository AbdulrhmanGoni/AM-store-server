import shortCutsPathesInDataBase from "../../CONSTANT/shortCutsPathesInDataBase.js";
import UsersModel from "../../models/Users.js";

const {
    userAddressPathes: { locationsList, selectedLocation }
} = shortCutsPathesInDataBase;

export default async function addLocation(userId, theLocation) {
    try {
        const { modifiedCount } = await UsersModel.updateOne(
            { _id: userId },
            {
                $push: { [locationsList]: { $each: [theLocation], $position: 0 } },
                $set: { [selectedLocation]: theLocation }
            }
        );
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }
}
