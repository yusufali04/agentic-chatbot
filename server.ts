import 'dotenv/config';
import express from "express";
import { chatController } from "./controllers/chatController";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
const allowedOrigins = ["http://localhost:5173"];
app.use(cors({
    origin: allowedOrigins
}));

app.post("/api/chat", async (req, res) => await chatController(req, res));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});