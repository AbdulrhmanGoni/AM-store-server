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

const API_Router = Router()

// testing using postman
API_Router.get("/test", testLab);
API_Router.post("/test", testLab);

API_Router.use("/users", [
    userDataRouter,
    shoppingCartRouter,
    favoritesRouter,
    usersOrdersRoute,
    locationsRouter,
    paymentMethodsRouter
]);
API_Router.use("/products", productsRouter);
API_Router.use("/", rootRouter);
API_Router.use("/orders", ordersRouter);
API_Router.use("/admin", adminAuth, adminRouter);
API_Router.use("/statistics", adminAuth, statisticsRouter);
API_Router.use("/settings", settingsRouter);

export default API_Router