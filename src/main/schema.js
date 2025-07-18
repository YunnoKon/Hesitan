import { z } from 'zod';

export default {
    roadmap: z.array(
      z.object({
        name: z.string().describe("Describe the task name, it should be short while informative"),
        description: z.string().describe("Describe the task briefly, this section should have the most info"),
        period: z.object({
          hour: z.number().describe("The number of hours per day to spend on this task"),
          minute: z.number().describe("The number of minutes per day to spend on this task"),
        }).describe("The amount of time per day to spend on this task"),
        date: z.string().describe("The date should be outputted in ISO format, the day to execute this task"),
      })
    )
}