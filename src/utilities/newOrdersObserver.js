import UsersController from "../controllers/users-controllers/UsersController.js";
import eventEmiter from "./eventEmiter.js";

export default async function newOrdersObserver(OrdersModel) {
    try {
        const changeStream = OrdersModel.watch();
        changeStream.on('change', async event => {
            if (event.ns.coll === "orders" && event.operationType === "insert") {
                delete event.fullDocument.paymentMethod;
                delete event.fullDocument.location;
                delete event.fullDocument.discountCobone;
                delete event.fullDocument.updatedAt;
                delete event.fullDocument.__v;
                const order = event.fullDocument
                const userDataProjection = { userEmail: 1, avatar: 1 }
                order.userData = await UsersController.getUserData(event.fullDocument.userId, userDataProjection)
                eventEmiter.emit("new-order", order)
            }
        });
    } catch { }
}

