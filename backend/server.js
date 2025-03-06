import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config(); //loads envrironment variable from .env to process.env
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

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
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);


// This belwo setup allows users to access uploaded files (e.g., images) directly via a URL in the browser,
//  which is useful for serving image uploads as static files.
//For example, if there’s a file uploads/image-123.jpg:
   //It would be accessible at http://localhost:PORT/uploads/image-123.jpg.
const __dirname = path.resolve(); //set __dirname to current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));// Set the directory for serving static files
//in 45 th line,,we are resolving upload folder with __dirname and also making tha upload folder as static

//this route directly goes to the file productRoutes
// and if any problem with this route above,,exoress will look for any middleware defined immediately below this code to handle unmatching url error
// and express will finf "notFoun" middleWare

if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname,'/frontend/build')));

  app.get('*',(req,res)=>
  res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
}else{
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server running on port ${port}`));
