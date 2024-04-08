import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import router from "./router/index";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(compression());
app.use(cookieparser());
app.use(bodyParser.json());
const dotenv = require("dotenv");
dotenv.config();

const server = http.createServer(app);

server.listen(8080, () => console.log("server running on 8080"));

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("error", (err: Error) => {
  console.log(err);
});

app.use("/", router());
