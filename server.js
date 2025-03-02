import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

app.get('/api/contacts', (req, res) => {
    res.status(200).send("Hello")
})