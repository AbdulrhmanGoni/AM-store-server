import UserModel from "../models/Users.js";
import mainPathesInDataBase from "../CONSTANT/shortCutsPathesInDataBase.js";
const {
    userAddressPathes: { selectedLocation: selectedPath, locationsList }
} = mainPathesInDataBase;

const locations_delete = async (req, res, next) => {
    try {
        const filter = { _id: req.params.userId };
        const { locationId } = req.body;
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
        next();
    } catch (error) {
        res.status(400).json(null);
    }
}

export default locations_delete;