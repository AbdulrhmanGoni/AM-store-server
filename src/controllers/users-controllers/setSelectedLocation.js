import shortCutsPathesInDataBase from "../../CONSTANT/shortCutsPathesInDataBase.js";
import UsersModel from "../../models/Users.js";

const {
    userAddressPathes: { selectedLocation }
} = shortCutsPathesInDataBase;

export default async function setSelectedLocation(userId, theLocation) {
    try {
        const { modifiedCount } = await UsersModel.updateOne({ _id: userId }, { $set: { [selectedLocation]: theLocation } });
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }
}
