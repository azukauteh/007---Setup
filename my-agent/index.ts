/**
 *  index.ts🧠 Agent 007 – AI-Powered Code Review
 *  Streams Gemini output, detects duplicate files, and formats results for contributor clarity
 */

import { config } from "dotenv";
import { z } from "zod";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "./prompts";
import { getFileChangesInDirectoryTool } from "./tools/getFileChangesInDirectoryTool";
import { checkForDuplicateFiles } from "./checkDuplicates";
import path from "path";
import chalk from "chalk";

// 🔐 Load .env from parent directory
config({ path: path.resolve(__dirname, "../.env") });

// ✅ Validate environment variables
const envSchema = z.object({
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(10),
});
const env = envSchema.parse(process.env);
const apiKey = env.GOOGLE_GENERATIVE_AI_API_KEY;

// 🤖 Initialize Gemini client
const genAI = createGoogleGenerativeAI({ apiKey });
const model = genAI("models/gemini-2.5-flash");

// 🧠 Thinking animation
async function showThinking(message = "🧠 Agent 007 is Thinking") {
  const dots = ["", ".", "..", "..."];
  let i = 0;

  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      process.stdout.write(`\r${chalk.blueBright(message)}${dots[i]}`);
      i = (i + 1) % dots.length;
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      process.stdout.write("\n");
      resolve();
    }, 3000);
  });
}

/**
 * Runs the Agent 007 code reviewer using streamed AI output.
 */
export const codeReviewAgent = async (): Promise<void> => {
  // 🧹 Check for duplicate files before review
  checkForDuplicateFiles("./");

  console.log(chalk.green("\n✅ No duplicate files found.\n"));
  await showThinking();

  // 🔍 Get file changes
  const changes = await getFileChangesInDirectoryTool("./my-agent");

  if (!changes.success) {
    console.error(chalk.red(`❌ Error: ${changes.error}`));
    return;
  }

  console.log(chalk.blueBright("\n🧠 Agent 007 Review Start\n"));

  for (const file of changes.files) {
    console.log(chalk.bold(`File: ${file.path}`));

    const diffContent = [
      ...(file.stagedDiffs || []),
      ...(file.unstagedDiffs || []),
    ].join("\n");

    if (!diffContent) {
      console.log(chalk.gray("No diff content available.\n"));
      continue;
    }

    // 🎯 Structured review prompt
    const reviewPrompt = `
      Review the following diff for ${file.path}.
      Summarize issues under categories:
      - Security
      - Bugs
      - Performance
      - Style

      Diff:
      ${diffContent}
    `;

    // 🧠 Stream Gemini output
    const result = streamText({
      model,
      prompt: reviewPrompt,
      system: SYSTEM_PROMPT,
    });

    for await (const chunk of result.textStream) {
      process.stdout.write(chalk.white(chunk));
    }

    console.log("\n");
  }

  console.log(chalk.greenBright("\n✅ Review Complete\n"));
};

// 🚀 Run agent if executed directly
if (import.meta.main) {
  await codeReviewAgent();
}

