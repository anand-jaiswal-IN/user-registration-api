import express from "express";
import router from "./routes/default.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser());

// default router
app.use('/', router);

export default app;
