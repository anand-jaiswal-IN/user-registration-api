import express from "express";
import router from "./routes/default.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());

// Log the URL and request type requested
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] ${req.method} request received for URL: ${
      req.url
    }`
  );
  next(); // Call the next middleware function in the stack
};

app.use(logRequest);

// default router
app.use("/", router);

export default app;
