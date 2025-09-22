import { config } from "dotenv";
import { z } from "zod";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { stepCountIs, streamText } from "ai";
import { SYSTEM_PROMPT } from "./prompts";
import { getFileChangesInDirectoryTool } from "../tools";
import path from "path";

// Load .env from parent directory
config({ path: path.resolve(__dirname, "../.env") });

// Validate environment
const envSchema = z.object({
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(10),
});
const env = envSchema.parse(process.env);
const apiKey = env.GOOGLE_GENERATIVE_AI_API_KEY;

// Initialize Gemini client
const genAI = createGoogleGenerativeAI({ apiKey });

// Select model
const model = genAI("models/gemini-2.5-flash");


/**
 * Asynchronously runs a code review agent using streamed AI output.
 *
 * @param {string} prompt - A natural language instruction specifying what the agent should review.
 *
 * The agent uses:
 * - Gemini 2.5 Flash via `GoogleGenerativeAI`
 * - `SYSTEM_PROMPT` to define reviewer behavior and tone
 * - `getFileChangesInDirectoryTool` to fetch file diffs from a Git directory
 * - `stepCountIs(10)` to limit the number of reasoning steps
 *
 * The output is streamed to stdout in real time.
 */
const codeReviewAgent = async (prompt: string) => {
  const result = streamText({
    model,
    prompt,
    system: SYSTEM_PROMPT,
    tools: {
      getFileChangesInDirectoryTool,
    },
    stopWhen: stepCountIs(10),
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }
};

/**
 * Entry point: triggers the code review agent with a specific prompt.
 *
 * The prompt instructs the agent to:
 * - Review code changes in the '../my-agent' directory
 * - Provide feedback and suggestions file by file
 */
await codeReviewAgent(
  " Review the code changes in '.' directory, make your reviews and suggestions file by file"
);
