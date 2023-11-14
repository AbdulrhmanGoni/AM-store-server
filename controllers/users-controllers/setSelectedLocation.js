import shortCutsPathesInDataBase from "../../CONSTANT/shortCutsPathesInDataBase.js";
import UserModel from "../../models/Users.js";

const {
    userAddressPathes: { selectedLocation }
} = shortCutsPathesInDataBase;

export default async function setSelectedLocation() {

    try {
        const { modifiedCount } = await UserModel.updateOne(filter, { $set: { [selectedLocation]: theLocation } });
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }

}
