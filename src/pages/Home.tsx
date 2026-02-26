import { useState, useRef, useEffect } from "react";
import type { Message } from "../types";
import { getResponse } from "../api/chat";
import { useMutation } from "@tanstack/react-query";

const Home = () => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    // call send when enter is pressed in the textarea
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }
    const mutation = useMutation({
        mutationFn: (messages: Message[]) => getResponse(messages),
        onSuccess: (response) => {
            setMessages(prev => [...prev, response.data]);
        },
    })
    const handleSend = async () => {
        if(message.trim() === "") return;
        const updatedMessages = [
            ...messages,
            { role: "user" as const, content: message }
        ];
        setMessages(updatedMessages);
        mutation.mutate(updatedMessages);
        setMessage("");
    }
    return (
        // hide scrollbar but still allow scrolling 
        <div className="text-white container mx-auto max-w-4xl p-4 h-full overflow-y-auto hide-scroll pb-45">

            {
                messages.map((msg, index) => (
                    <div key={index} className={`${msg.role === "user" ? "bg-neutral-800 ml-auto" : "bg-primary mr-auto"} p-3 rounded-xl w-fit my-2`}>
                        {msg.content}
                    </div>
                ))
            }
            <div ref={messagesEndRef} />
            {/* bottom text area goes here */}
            <div className="fixed bottom-5 left-0 right-0 mx-auto max-w-4xl">
                <div className="bg-neutral-800 rounded-xl p-4 mt-6">
                    <textarea className="w-full p-2 rounded-xl text-white resize-none outline-none custom-scroll" placeholder="Type your message here..." rows={2} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown}/>
                    <div className="flex justify-end items-center">
                        <button className="bg-white text-black px-4 py-2 rounded-xl mt-2 cursor-pointer hover:bg-gray-200" onClick={handleSend}>Send</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;