import { Agent, createTool } from "@mastra/core"
import { DateTool } from "./tools"
import { createProvider, getConfig, replaceTemplate } from "./utils"
import Prompt from './prompt.json';
import Schema from './schema.js';
import { z } from 'zod'

export const events = {
    'agent:chat': async(e, args) => {
        let config = await getConfig()
        let provider = await createProvider(args.preferredProvider,config["providerConfig"][args.preferredProvider]["key"])
        let roadmapAgent = new Agent({
            name: "Roadmap Agent",
            model: provider(args.modelName),
            instructions: `You are generating structured output`
        });
        const RoadmapTool = createTool({
            id: "build-roadmap",
            description: "Build a detailed roadmap from your prompt.",
            inputSchema: z.object({ 
                prompt: z.string().describe("It should be detailed for better result."),
                startDate: z.string().describe("In ISO Format"),
                endDate: z.string().describe("In ISO Format")
            }),
            outputSchema: z.object({ status: z.string() }),
            execute: async ({ context }) => {
                const response = await roadmapAgent.generate([
                    {
                        role: "system",
                        content: replaceTemplate(Prompt.roadmap,{ startDate:context.startDate, endDate:context.endDate })
                    },
                    { role: "user", content: context.prompt },
                ],{
                    output: Schema.roadmap
                });
                e.sender.send('agent:roadmapResponse',response.object)
                return { status: "Success. Roadmap Generated." }
            },
        });
        let agent = new Agent({
            name: "Chat Assistant",
            model: provider(args.modelName),
            instructions: `You are a mainly a chat assistant and tutor.
            use the roadmap tool ONLY if user requested or intent to generate roadmap, for more accurate date, you should use date tool.
            The roadmap tool requires prompting, which should be more clear for better result.
            Using the roadmap tool will automatically generate the roadmap, please just inform the status of the generation.`,
            tools:{
                RoadmapTool,
                DateTool
            }
        });
        const resp = await agent.stream(args.chatHistory)
        for await (const chunk of resp.textStream) { 
            e.sender.send('agent:chatStream', chunk)
        }
    }
}