require("dotenv").config();
import express from "express";
import initOrdersRoutes from "../../routes/orderRoutes";
import initOrderItemsRoutes from "../../routes/orderItemRoutes";
import bodyParser from "body-parser";
import { configCors } from "../../config/cors";
import cookieParser from "cookie-parser";

const app = express();
const ORDER_PORT = process.env.ORDER_PORT || 8082;

// Config CORS
configCors(app);

// Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config cookie-parser
app.use(cookieParser());

// Initialize Product routes
initOrderItemsRoutes(app);
initOrdersRoutes(app);
app.use((req, res) => {
  return res.status(404).send("Order Service: 404 Not Found");
});

app.listen(ORDER_PORT, () => {
  console.log("Order Service is running on port " + ORDER_PORT);
});
