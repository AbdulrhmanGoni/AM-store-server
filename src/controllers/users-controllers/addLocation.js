import shortCutsPathesInDataBase from "../../CONSTANT/shortCutsPathesInDataBase.js";
import UsersModel from "../../models/Users.js";
import crypto from "crypto";

const {
    userAddressPathes: { locationsList, selectedLocation }
} = shortCutsPathesInDataBase;

export default async function addLocation(userId, theLocation) {
    try {
        theLocation.id = crypto.randomUUID();
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
