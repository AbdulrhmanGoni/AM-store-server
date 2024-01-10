import { Router } from "express";

import userDataRouter from "./userDataRouter.js";
import productsRouter from "./productsRouter.js";
import shoppingCartRouter from "./shoppingCartRouter.js";
import favoritesRouter from "./favoritesRouter.js";
import locationsRouter from "./locationsRouter.js";
import paymentMethodsRouter from "./paymentMethodsRouter.js";
import usersOrdersRoute from "./usersOrdersRoute.js";
import ordersRouter from "./ordersRouter.js";
import settingsRouter from "./settingsRouter.js";
import rootRouter from "./rootRouter.js";
import adminRouter from "./adminRouter.js";
import statisticsRouter from "./statisticsRouter.js";
import adminAuth from "../auth/adminAuth.js";
import testLab from "../testLab.js";

const mainRouter = Router()

// testing using postman
mainRouter.get("/test", testLab);
mainRouter.post("/test", testLab);
mainRouter.put("/test", testLab);
mainRouter.patch("/test", testLab);

mainRouter.use("/users", [
    userDataRouter,
    shoppingCartRouter,
    favoritesRouter,
    usersOrdersRoute,
    locationsRouter,
    paymentMethodsRouter
]);
mainRouter.use("/products", productsRouter);
mainRouter.use("/", rootRouter);
mainRouter.use("/orders", ordersRouter);
mainRouter.use("/admin", adminAuth, adminRouter);
mainRouter.use("/statistics", adminAuth, statisticsRouter);
mainRouter.use("/settings", settingsRouter);

export default mainRouter