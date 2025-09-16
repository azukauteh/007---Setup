
import { config } from "dotenv";
import { stepCountIs, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { SYSTEM_PROMPT } from "./prompts";
import { getFileChangesInDirectoryTool } from "../tools";

 // load .env from parent
config({ path: "../.env" });

// Load API key from environment
const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GOOGLE_GENERATIVE_AI_API_KEY in .env");
}

// Initialize model with explicit API key
const model = google("models/gemini-2.5-flash", {
  apiKey,
});

/**
 * Asynchronously runs a code review agent using streamed AI output.
 *
 * @param {string} prompt - A natural language instruction specifying what the agent should review.
 *
 * The agent uses:
 * - `google("models/gemini-2.5-flash")` as the LLM backend
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
  "Review the code changes in '../my-agent' directory, make your reviews and suggestions file by file"
);
// temp change
