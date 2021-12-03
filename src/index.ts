import express from "express";
import router from "./app";
import { environment } from "./environment"
// Inicializations
const app = express();
require("./database")

// Setiings
app.set("port", environment.port)
// Middleweares

// Routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
// Static files

// Starts the server
app.listen(app.get("port"), () => console.log(`server on port ${app.get("port")}`))