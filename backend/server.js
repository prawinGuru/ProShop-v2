import express from "express";
import dotenv from "dotenv";
dotenv.config(); //loads envrironment variable from .env to process.env
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

//Body parser middleWare  --> this will make the body to be recieved properly
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleWate---> will allow us to access "req.cookies"
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

//this route directly goes to the file productRoutes
// and if any problem with this route above,,exoress will look for any middleware defined immediately below this code to handle unmatching url error
// and express will finf "notFoun" middleWare
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server running on port ${port}`));
