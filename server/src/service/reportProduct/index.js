require("dotenv").config();
import express from "express";
import initReportsProductRoutes from "../../routes/reportRoutes";
import bodyParser from "body-parser";
import { configCors } from "../../config/cors";
import cookieParser from "cookie-parser";

const app = express();
const REPORT_PORT = process.env.REPORT_PORT || 8083;

// Config CORS
configCors(app);

// Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config cookie-parser
app.use(cookieParser());

// Initialize Product routes
initReportsProductRoutes(app);

app.use((req, res) => {
  return res.status(404).send("Report Service: 404 Not Found");
});

app.listen(REPORT_PORT, () => {
  console.log("Report Service is running on port " + REPORT_PORT);
});
