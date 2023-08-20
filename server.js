import express, { json } from "express";
import { connect } from "mongoose";
import MONGO_DB_LINK from "./CONSTANT/MONGO_DB_LINK.js";
import userDataRouter from "./routes/userDataRouter.js";
import productsRouter from "./routes/productsRouter.js";
import shoppingCartRouter from "./routes/shoppingCartRouter.js";
import favoritesRouter from "./routes/favoritesRouter.js";
import locationsRouter from "./routes/locationsRouter.js";
import paymentMethodsRouter from "./routes/paymentMethodsRouter.js";
import userOrdersRoute from "./routes/userOrdersRoute.js";
import ordersRouter from "./routes/ordersRouter.js";
import constantsRouter from "./routes/constantsRouter.js";
import directRouter from "./routes/directRouter.js";
import adminRouter from "./routes/adminRouter.js";
import statisticsRouter from "./routes/statisticsRouter.js";
import corsWhitelist from "./CONSTANT/corsWhitelist.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import adminAuth from "./midelwheres/adminAuth.js";


// the App
const app = express();

// DataBase connection
connect(MONGO_DB_LINK)
    .then(() => { console.log("conneted successfully") })
    .catch(err => { console.log(err) })


// midelwheres
app.use([json()]);
app.use(cookieParser());
app.use(cors({
    origin: corsWhitelist,
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());


// Routers
app.use("/users", [
    userDataRouter,
    shoppingCartRouter,
    favoritesRouter,
    locationsRouter,
    userOrdersRoute,
    paymentMethodsRouter
]);
app.use("/products", productsRouter);
app.use("/", directRouter);
app.use("/orders", ordersRouter);
app.use("/admin", adminAuth, adminRouter);
app.use("/statistics", adminAuth, statisticsRouter);
app.use("/constants", constantsRouter);


// listenig
const port = 7000;
app.listen(port, async () => {
    console.log("http://localhost:" + port);
})