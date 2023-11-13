import UserModel from "../../models/Users";

export default async function users_count() {
    try {
        const usersCount = await UserModel.count()
        res.status(200).json(usersCount);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}
