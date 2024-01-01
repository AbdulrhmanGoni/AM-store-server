import SystemController from "../../controllers/system-controller/SystemController.js";

export default async function feedbacks_get(req, res) {
    try {
        let { sliceNumber, sliceSize } = req.query;
        const options = {
            sliceNumber: +sliceNumber - 1,
            sliceSize: +sliceSize
        }
        const { status, response } = await SystemController.getFeedbacks(options)
        res.status(status).json(response);
    } catch (error) {
        res.status(500).json();
    }
}