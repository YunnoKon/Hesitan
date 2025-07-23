import Schema from './schema.js';
import Prompt from './prompt.json';
import { Agent } from "@mastra/core/agent";
import { replaceTemplate, createProvider, storeConfig, getConfig, classifyError } from "./utils.js"

export const handlers = {
    'config:save': (_, args) => {
        storeConfig(args)
    },
    'config:get': async (_, args) => {
        return await getConfig();
    },
    'agent:roadmap': async(_, args) => {
        let config = await getConfig()
        let provider = await createProvider(args.preferredProvider,config["providerConfig"][args.preferredProvider]["key"])
        let agent = new Agent({
            name: "Roadmap Assistant",
            model: provider(args.modelName),
            instructions: "You are a helpful assistant",
        });
        try {
            const response = await agent.generate([
            {
                role: "system",
                content: replaceTemplate(Prompt.roadmap,{
                    startDate:args.startDate,
                    endDate:args.endDate
                })
            },
            { role: "user", content: args.userPrompt },
            ],{
                output: Schema.roadmap
            });
            return response.object
        } catch(err){
            return {
                failed:true,
                message:classifyError(err.message)
            }
        }
    }
}