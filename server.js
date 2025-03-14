import express from "express";
import dotenv from "dotenv";
import contactRouter from "./routes/contactRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/dbConnection.js";

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 3006;

app.use(express.json());
app.use("/api/contacts", contactRouter);
app.use("/api/user", userRouter);
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
