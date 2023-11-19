import UserModel from "../../models/Users.js";
import shortCutsPathesInDataBase from "../../CONSTANT/shortCutsPathesInDataBase.js";


export default async function deleteLocation(userId, locationId) {
    try {
        const { selectedLocation, locationsList } = shortCutsPathesInDataBase.userAddressPathes;
        const filter = { _id: userId };
        const { modifiedCount } = await UserModel.bulkWrite([
            {
                updateOne: {
                    filter,
                    update: { $pull: { [locationsList]: { id: locationId } } }
                },
            },
            {
                updateOne: {
                    filter: {
                        ...filter,
                        [selectedLocation + ".id"]: locationId
                    },
                    update: { $set: { [selectedLocation]: null } }
                },
            }
        ])
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }
}