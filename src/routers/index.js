import { Router } from "express";

import userDataRouter from "./userDataRouter.js";
import productsRouter from "./productsRouter.js";
import shoppingCartRouter from "./shoppingCartRouter.js";
import favoritesRouter from "./favoritesRouter.js";
import locationsRouter from "./locationsRouter.js";
import paymentMethodsRouter from "./paymentMethodsRouter.js";
import ordersRouter from "./ordersRouter.js";
import settingsRouter from "./settingsRouter.js";
import rootRouter from "./rootRouter.js";
import adminRouter from "./adminRouter.js";
import statisticsRouter from "./statisticsRouter.js";
import adminAuth from "../auth/adminAuth.js";
import userAuth from "../auth/userAuth.js";

const mainRouter = Router()

mainRouter.use("/users", userAuth, [
    userDataRouter,
    shoppingCartRouter,
    favoritesRouter,
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