import axiosInstance from "./axios";

export const getResponse = async (messages: { role: string; content: string }[]) => await axiosInstance.post("/api/chat", { messages });