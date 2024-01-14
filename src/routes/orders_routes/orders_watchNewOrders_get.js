import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";
import eventEmiter from "../../utilities/eventEmiter.js";

let newOrdersReceivers = [];

eventEmiter.on("new-order", (order) => {
    newOrdersReceivers.forEach((receiver) => {
        receiver(order)
    })
})

export default asyncRouteHandler(
    async function orders_watchNewOrders_get(_req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        const receiverIndex = newOrdersReceivers.length
        newOrdersReceivers.push((order) => {
            res.write(`data: ${JSON.stringify(order)}\n\n`)
        })

        res.on("close", () => {
            newOrdersReceivers = newOrdersReceivers.filter((_, index) => index !== receiverIndex)
        })
    }
)