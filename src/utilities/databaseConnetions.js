import { connect } from "mongoose";
import MONGO_DB_LINK from "../CONSTANT/MONGO_DB_LINK.js";

connect(MONGO_DB_LINK).then(() => { console.log("conneted to the db successfully") })