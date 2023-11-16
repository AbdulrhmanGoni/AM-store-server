import UserModel from "../../models/Users.js";
import shortCutsPathesInDataBase from "../../CONSTANT/shortCutsPathesInDataBase.js";

const {
    userAddressPathes: { selectedLocation: selectedPath, locationsList }
} = shortCutsPathesInDataBase;

export default async function deleteLocation(userId, locationId) {
    try {
        const filter = { _id: userId };
        const { userAddress: { selectedLocation } } = await UserModel.findOneAndUpdate(
            filter, { $pull: { [locationsList]: { id: locationId } } }
        );
        if (selectedLocation) {
            if (selectedLocation.id === locationId) {
                await UserModel.updateOne(
                    filter,
                    { $set: { [selectedPath]: null } }
                );
            }
        }

        return true;
    } catch (error) {
        console.log(error)
        return null;
    }
}
