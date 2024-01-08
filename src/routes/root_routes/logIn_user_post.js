import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function logIn_user_post(req, res) {
        const { userEmail, userPassword } = req.body;
        const response = await SystemController.logInUser({ userEmail, userPassword });
        if (response.status) res.status(200).json(response);
        else res.status(400).json(response);
    }
)
