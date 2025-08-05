import { Notification } from "electron";
import { Agent, createTool } from "@mastra/core"
import { DateTool } from "./tools"
import { classifyError, createProvider, getConfig, replaceTemplate } from "./utils"
import Prompt from './prompt.json';
import Schema from './schema.js';
import { z } from 'zod'

let monitorId;

export const events = {
    'agent:chat': async(e, args) => {
        let config = await getConfig()
        if(!config){
            e.sender.send('agent:chatError', classifyError("key"))
            e.sender.send('agent:chatStreamEnd')
            return;
        }
        let provider = await createProvider(args.preferredProvider,config["providerConfig"][args.preferredProvider]["key"])
        let roadmapAgent = new Agent({
            name: "Roadmap Agent",
            model: provider(args.modelName),
            instructions: `You are generating structured output`
        });
        const RoadmapTool = createTool({
            id: "build-roadmap",
            description: "Build a detailed roadmap from your prompt.",
            inputSchema: Schema.roadmapToolInput,
            outputSchema: z.object({ status: z.string() }),
            execute: async ({ context }) => {
                e.sender.send('agent:roadmapStart')
                const response = await roadmapAgent.generate([
                    {
                        role: "system",
                        content: replaceTemplate(Prompt.roadmap,{ startDate:context.startDate, endDate:context.endDate })
                    },
                    { role: "user", content: context.prompt },
                ],{
                    output: Schema.roadmap
                });
                e.sender.send('agent:roadmapEnd',response.object)
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
        const resp = await agent.stream(args.chatHistory,{
            temperature:args.agentSettings.temperature,
            onError:(err) => {
                e.sender.send('agent:chatError', classifyError(err.error.message))
            }
        })
        for await (const chunk of resp.textStream) { 
            e.sender.send('agent:chatStream', chunk)
        }
        e.sender.send('agent:chatStreamEnd')
    },
    'monitor:start': async(_, args) => {
        if(!args.monitoring) return;
        const { activeWindow } = await import('@deepfocus/get-windows');
        monitorId = setInterval(async() => {
            let activeWin = await activeWindow()
            let check = args.monitorList.some(p => activeWin?.owner.path.toLowerCase().includes(p))
            if(check){
                new Notification({
                    title:"Well, well, well...",
                    body:"Perhaps you should focus back on your work right now?"
                }).show()
            }
        },args.monitorInterval)
    },
    'monitor:end': (_ ,args) => {
        clearInterval(monitorId)
    }
}