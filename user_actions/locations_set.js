import UserModel from "../models/Users.js";
import mainPathesInDataBase from "../CONSTANT/shortCutsPathesInDataBase.js";
const {
    userAddressPathes: { selectedLocation, locationsList }
} = mainPathesInDataBase;

const locations_set = async (req, res, next) => {
    const filter = { _id: req.params.userId };
    const { theLocation, type } = req.body;
    try {
        if (type === "addNewLocation") {
            await UserModel.updateOne(filter, { $push: { [locationsList]: theLocation } });
        }
        await UserModel.updateOne(filter, { $set: { [selectedLocation]: theLocation } });
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default locations_set;