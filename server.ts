import 'dotenv/config';
import express from "express";
import { chatController } from "./controllers/chatController";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.post("/api/chat", async (req, res) => await chatController(req, res));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});