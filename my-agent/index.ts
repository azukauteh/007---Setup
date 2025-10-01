// index.ts
// 🧠 Agent 007 – AI-Powered Code Review
// Streams Gemini output, detects duplicate files, and formats results for contributor clarity

import { config } from "dotenv";
import { z } from "zod";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { stepCountIs, streamText } from "ai";
import { SYSTEM_PROMPT } from "./prompts";
import { getFileChangesInDirectoryTool } from "../tools";
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

/**
 * Runs the Agent 007 code reviewer using streamed AI output.
 *
 * @param {string} prompt - Natural language instruction for what to review.
 * @returns {Promise<string>} - Full streamed output for testability and logging.
 */
export const codeReviewAgent = async (prompt: string): Promise<string> => {
	// 🧹 Check for duplicate files before review
	checkForDuplicateFiles("./");

	// 🎯 Stream Gemini output
	const result = streamText({
		model,
		prompt,
		system: SYSTEM_PROMPT,
		tools: {
			getFileChangesInDirectoryTool,
		},
		stopWhen: stepCountIs(10),
	});

	console.log(chalk.blueBright("\n🧠 Agent 007 Review Start\n"));

	let output = "";
	for await (const chunk of result.textStream) {
		process.stdout.write(chalk.white(chunk));
		output += chunk;
	}

	console.log(chalk.greenBright("\n✅ Review Complete\n"));
	return output;
};

// 🚀 Optional: Run agent if this file is executed directly
if (import.meta.main) {
	await codeReviewAgent(
		"Review the code changes in '.' directory. Make your reviews and suggestions file by file.",
	);
}
