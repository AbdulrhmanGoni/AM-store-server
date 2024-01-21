import { connect } from "mongoose";
import MONGO_DB_LINK from "../CONSTANT/MONGO_DB_LINK.js";

connect(MONGO_DB_LINK)
    .then(() => { console.log("connected to the db successfully") })
    .catch((err) => { console.log("failed database connection", err.message) })
