import SystemController from '../../controllers/system-controller/SystemController.js'

export default async function logIn_loggedUser_get(req, res) {
    try {
        const response = await SystemController.loggedUser(req.userId)
        response && res.status(200).json(response);
        !response && res.status(400).json()
    } catch (error) {
        console.log(error)
        res.status(400).json()
    }
}
