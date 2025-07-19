import Schema from './schema.js';
import Prompt from './prompt.json';
import { Agent } from "@mastra/core/agent";
import { replaceTemplate, createProvider, storeConfig, getConfig } from "./utils.js"

export const handlers = {
    'config:save': (_, args) => {
        storeConfig(args)
    },
    'config:get': async (_, args) => {
        return await getConfig();
    },
    'agent:roadmap': async(_, args) => {
        let config = await getConfig()
        let provider = await createProvider("google",config.keys.google)
        let agent = new Agent({
            name: "Roadmap Assistant",
            model: provider(args.modelName, {
                useSearchGrounding:true,
            }),
            instructions: "You are a helpful assistant",
        });
        const response = await agent.generate([
        {
            role: "system",
            content: replaceTemplate(Prompt.roadmap,{
                startDate:"19/7/2025",
                endDate:"21/7/2025"
            })
        },
        { role: "user", content: args.userPrompt },
        ],{
            output: Schema.roadmap
        });
        console.log(response.object)
    }
}