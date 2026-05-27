import express from "express";
import type { Application } from "express";
import dotenv from "dotenv";
import accountRoutes from "./routes/account.routes.js";

dotenv.config();

const app: Application = express(); 
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/accounts", accountRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Banking System API" });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

