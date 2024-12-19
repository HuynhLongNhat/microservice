require("dotenv").config();
import express from "express";
import initProductRoutes from "../../routes/productRoutes.js";
import bodyParser from "body-parser";
import { configCors } from "../../config/cors";
import cookieParser from "cookie-parser";

const app = express();
const PRODUCT_PORT = process.env.PRODUCT_PORT || 8081;

// Config CORS
configCors(app);

// Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config cookie-parser
app.use(cookieParser());

// Initialize Product routes
initProductRoutes(app);

app.use((req, res) => {
  return res.status(404).send("Product Service: 404 Not Found");
});

app.listen(PRODUCT_PORT, () => {
  console.log("Product Service is running on port " + PRODUCT_PORT);
});
