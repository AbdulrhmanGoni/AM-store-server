import SystemController from "../../controllers/system-controller/SystemController.js";

export default async function feedbacks_delete(req, res) {
    try {
        const { feedbackId } = req.query;
        const response = await SystemController.deleteFeedback(feedbackId)
        res.status(response ? 200 : 400).json();
    } catch (error) {
        res.status(500).json();
    }
}