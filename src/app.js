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
import sanitizer from "express-mongo-sanitize"; // a midelwheres prevents noSQL injection.
import { xss } from "express-xss-sanitizer"; // a middleware prevents Cross Site Scripting (XSS) attack.
import hpp from "hpp"; // a midelwheres protect against HTTP Parameter Pollution attacks.
import testLab from "./testLab.js";

const app = express();

// midelwheres
app.use([
    sanitizer(),
    json({ limit: "2mb" }),
    hpp(),
    xss(),
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

app.use((_, res) => {
    res.status(404).json({
        message: "Sorry, the content you're looking for doesn't exist."
    });
});

export default app;