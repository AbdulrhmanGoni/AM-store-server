import express, { json } from "express";
import "./utilities/databaseConnetions.js";
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
import sanitizer from "express-mongo-sanitize";
import { xss } from "express-xss-sanitizer";
import hpp from "hpp";
import testLab from "./testLab.js";
import ErrorGenerator from "./utilities/ErrorGenerator.js";
import errorsHandler from "./middlewares/errorsHandler.js";

const app = express();

// midelwheres
app.use([
    sanitizer(), // a midelwheres prevents noSQL injection.
    json({ limit: "5kb" }),
    hpp(), // a midelwheres protect against HTTP Parameter Pollution attacks.
    xss(),// a middleware prevents Cross Site Scripting (XSS) attack.
    cookieParser(),
    cors({ origin: corsWhitelist, credentials: true })
]);

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

app.use("*", (_req, _res, next) => {
    const message = "Sorry, the content you're looking for doesn't exist.";
    const error = new ErrorGenerator(message, 404);
    next(error);
});

app.use(errorsHandler);

export default app;