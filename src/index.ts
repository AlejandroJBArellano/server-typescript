import express from "express";
import router from "./app";
import { environment } from "./environment";
import morgan from "morgan";
// Inicializations
const app = express();
require("./database")

// Setiings
app.set("port", environment.port)
// Middleweares

// Routes
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(router);
app.use(morgan("dev"));
// Static files

// Starts the server
app.listen(app.get("port"), () => console.log(`server on port ${app.get("port")}`))