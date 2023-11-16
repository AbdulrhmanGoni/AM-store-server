import shortCutsPathesInDataBase from "../../CONSTANT/shortCutsPathesInDataBase.js";
import UserModel from "../../models/Users.js";

const {
    userAddressPathes: { locationsList }
} = shortCutsPathesInDataBase;

export default async function addLocation() {

    try {
        const { modifiedCount } = await UserModel.updateOne(filter, { $push: { [locationsList]: theLocation } });
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }

}
