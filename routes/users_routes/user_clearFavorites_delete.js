import clearFavorites from '../../controllers/users-controllers/clearFavorites';

export default async function user_clearFavorites_delete(req, res) {
    try {
        const response = await clearFavorites(req.params.userId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(null);
    }
}
