import { tavily } from "@tavily/core";
import Groq from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY! });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export const generateResponse = async (messages: ChatCompletionMessageParam[]) => {
    console.log("messages: ", messages);
    while (true) {
        const completions = await groq.chat.completions.create({
            model: 'openai/gpt-oss-20b',
            temperature: 0,
            messages,
            tools: [
                {
                    type: "function",
                    function: {
                        name: "searchWeb",
                        description: "Search the web for current information",
                        parameters: {
                            type: "object",
                            properties: {
                                query: {
                                    type: "string",
                                    description: "The search query"
                                }
                            },
                            required: ["query"]
                        }
                    }
                }
            ],
            tool_choice: "auto"
        });
        const message = completions.choices[0].message;
        messages.push(message as ChatCompletionMessageParam);

        const toolCalls = message.tool_calls;
        
        if(!toolCalls || toolCalls.length === 0){
            return message.content;
        }
        for(const tool of toolCalls){
            const functionName = tool.function.name;
            const functionParams = tool.function.arguments;
            if(functionName === "searchWeb"){
                const parsedParams = JSON.parse(functionParams);
                const toolResult = await searchWeb(parsedParams);
                messages.push({
                    tool_call_id: tool.id,
                    role: "tool",
                    content: toolResult
                });
            }
        }
    }
}

const searchWeb = async ({query}: {query: string}) => {
    // use tavily to search the web for the query and return the results as a string
    console.log("Searching the web...");
    const response = await tvly.search(query, { max_results: 3 });
    
    const finalResults = response.results.map((result) => result.content).join("\n");
    return finalResults;
}