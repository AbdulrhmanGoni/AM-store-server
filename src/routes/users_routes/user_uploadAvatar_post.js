import uploadNewAvatar from "../../controllers/users-controllers/uploadNewAvatar.js";

export default async function user_uploadAvatar_post(req, res) {
    try {
        const respond = await uploadNewAvatar(req.params.userId, req.body.avatarUrl);
        res.status(respond ? 200 : 400).json(respond ?? false);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}