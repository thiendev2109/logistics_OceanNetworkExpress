import express from "express";
import { urlencoded, json } from "body-parser";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connection from "./configs/connectDB";
import initialApiRouter from "./routers/apiRouter";
import initialWebRouter from "./routers/webRouter";
import cors from "cors";

// import initialWebRouter from './routers/webRouter'
import configViewEngine from "./configs/viewEngine";
const port = process.env.PORT || 8080;
const app = express();

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.REACT_URL || "http://localhost:3000/"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors({ origin: true }));

// parse application/json
app.use(json());

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

app.use(cookieParser());

// if you use view engine
configViewEngine(app);

connection.connectDB();
initialApiRouter(app);
initialWebRouter(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
