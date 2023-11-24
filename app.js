import express, { json } from "express";
import "./functions/databaseConnetions.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {
    userDataRouter,
    productsRouter,
    shoppingCartRouter,
    favoritesRouter,
    locationsRouter,
    paymentMethodsRouter,
    usersOrdersRoute,
    ordersRouter,
    settingsRouter,
    rootRouter,
    adminRouter,
    statisticsRouter
} from "./routers/index.js";
import adminAuth from "./auth/adminAuth.js";
import corsWhitelist from "./CONSTANT/corsWhitelist.js";
import testLab from "./testLab.js";

// the App
const app = express();

// midelwheres
app.use([json()]);
app.use(cookieParser());
app.use(cors({ origin: corsWhitelist, credentials: true }));

// testing using postman
app.get("/test", testLab);
app.post("/test", testLab);

// Routers
app.use("/users", [
    userDataRouter,
    shoppingCartRouter,
    favoritesRouter,
    usersOrdersRoute,
    locationsRouter,
    paymentMethodsRouter
]);
app.use("/products", productsRouter);
app.use("/", rootRouter);
app.use("/orders", ordersRouter);
app.use("/admin", adminAuth, adminRouter);
app.use("/statistics", adminAuth, statisticsRouter);
app.use("/settings", settingsRouter);

export default app;