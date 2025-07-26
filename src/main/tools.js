import { createTool } from "@mastra/core";
import { z } from 'zod';

export const DateTool = createTool({
  id:"get-date",
  description:"Get current date",
  outputSchema: z.string(),
  execute: () => {
    return new Date().toISOString()
  }
})