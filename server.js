import express, { json } from "express";
import { connect } from "mongoose";
import MONGO_DB_LINK from "./CONSTANT/MONGO_DB_LINK.js";
import userDataRouter from "./routers/userDataRouter.js";
import productsRouter from "./routers/productsRouter.js";
import shoppingCartRouter from "./routers/shoppingCartRouter.js";
import favoritesRouter from "./routers/favoritesRouter.js";
import locationsRouter from "./routers/locationsRouter.js";
import paymentMethodsRouter from "./routers/paymentMethodsRouter.js";
import usersOrdersRoute from "./routers/usersOrdersRoute.js";
import ordersRouter from "./routers/ordersRouter.js";
import settingsRouter from "./routers/settingsRouter.js";
import rootRouter from "./routers/rootRouter.js";
import adminRouter from "./routers/adminRouter.js";
import statisticsRouter from "./routers/statisticsRouter.js";
import adminAuth from "./auth/adminAuth.js";
import corsWhitelist from "./CONSTANT/corsWhitelist.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import testLab from "./testLab.js";


// the App
const app = express();

// DataBase connection
connect(MONGO_DB_LINK)
    .then(() => { console.log("conneted successfully") })
    .catch(err => { console.log(err) })


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


// listenig
const port = 7000;
app.listen(port, async () => {
    console.log("http://localhost:" + port);
})