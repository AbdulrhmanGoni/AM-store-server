import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";
import eventEmiter from "../../utilities/eventEmiter.js";

const feedbacksReceivers = []

eventEmiter.on("feedback", (feedback) => {
    feedbacksReceivers.forEach((receiver) => {
        receiver(feedback)
    })
})

export default asyncRouteHandler(
    async function feedbacks_SSE_get(_req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        const receiverIndex = feedbacksReceivers.length;
        feedbacksReceivers.push((feedback) => {
            res.write(`data: ${JSON.stringify(feedback)}\n\n`)
        })

        res.on("close", () => {
            delete feedbacksReceivers[receiverIndex]
        })
    }
)