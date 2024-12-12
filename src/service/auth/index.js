require("dotenv").config();
import express from "express";
import initAuthRoutes from "../../routes/authRoutes.js";
import bodyParser from "body-parser";
import { configCors } from "../../config/cors.js";
import cookieParser from "cookie-parser";

const app = express();
const AUTH_PORT = process.env.AUTH_PORT || 8080;

// Config CORS
configCors(app);

// Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config cookie-parser
app.use(cookieParser());

// Initialize Auth routes
initAuthRoutes(app);

app.use((req, res) => {
  return res.status(404).send("Auth Service: 404 Not Found");
});

app.listen(AUTH_PORT, () => {
  console.log("Auth Service is running on port " + AUTH_PORT);
});
