import express from "express";
import dotenv from "dotenv";
import contactRouter from "./routes/contactRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(errorHandler)
app.use("/api/contacts", contactRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
