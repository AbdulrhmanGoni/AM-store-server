import SystemController from "../../controllers/system-controller/SystemController.js";

export default async function feedbacks_post(req, res) {
    try {
        const { status, response } = await SystemController.addFeedback(req.body)
        res.status(status).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" });
    }
}