import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import { errorHandler, notFound } from "./middleware/errorHandler";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://mj-devlinks.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>Hello From Server...</h1>");
});

//User Routes
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);
const startApp = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startApp();
