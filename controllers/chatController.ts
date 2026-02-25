import { Request, Response } from "express";
import { generateResponse } from "../services/chatService";


export const chatController = async (req: Request, res: Response) => {
    const { messages } = req.body;
    const completeChat = [
        {
            role: "system",
            content: `You are a helpful assistant that answers questions about the world. When you need current information, use the searchWeb tool to search the web. Below are the tools that you have access to: 
            1. searchWeb({query}: {query: string})
            
            Use this date and time wherever required - Current date and time: ${new Date().toISOString()}`
        },
        ...messages
    ]
    const response = await generateResponse(completeChat);
    res.json({ response });
};