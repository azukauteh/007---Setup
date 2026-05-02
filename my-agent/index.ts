/**
 *  index.ts🧠 Agent 007 – AI-Powered Code Review
 *  Streams Gemini output, detects duplicate files, and
 *                  formats results for contributor clarity
 */

import path from "node:path";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import chalk from "chalk";
import { config } from "dotenv";
import { z } from "zod";
import { checkForDuplicateFiles } from "./checkDuplicates";
import { SYSTEM_PROMPT } from "./prompts";
import { getFileChangesInDirectoryTool } from "./tools/getFileChangesInDirectoryTool";

// 🔐 Load .env
config({ path: path.resolve(__dirname, "../.env") });

// ✅ Validate env
const envSchema = z.object({
	GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(10),
});
const env = envSchema.parse(process.env);

// 🤖 Model init
const genAI = createGoogleGenerativeAI({
	apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
});
const model = genAI("models/gemini-2.5-flash");

// 🧠 Thinking animation
async function showThinking(message = "🧠 Agent 007 is Thinking") {
	const dots = ["", ".", "..", "..."];
	let i = 0;

	return new Promise<void>((resolve) => {
		const interval = setInterval(() => {
			process.stdout.write(`\r${chalk.blueBright(message)}${dots[i]}`);
			i = (i + 1) % dots.length;
		}, 400);

		setTimeout(() => {
			clearInterval(interval);
			process.stdout.write("\n");
			resolve();
		}, 2000);
	});
}

/**
 * 🧠 Agent 007 Reviewer
 * @param externalPrompt optional PR-level prompt
 */
export const codeReviewAgent = async (
	externalPrompt?: string,
): Promise<string> => {
	checkForDuplicateFiles("./");

	console.log(chalk.green("\n✅ No duplicate files found.\n"));
	await showThinking();

	let output = "";

	// 🔥 PR-level review (server/webhook mode)
	if (externalPrompt) {
		const result = streamText({
			model,
			prompt: externalPrompt,
			system: SYSTEM_PROMPT,
		});

		for await (const chunk of result.textStream) {
			process.stdout.write(chalk.white(chunk));
			output += chunk;
		}

		console.log(chalk.greenBright("\n✅ Review Complete\n"));
		return output;
	}

	// 🔍 CLI mode (local diffs)
	const changes = await getFileChangesInDirectoryTool("./my-agent");

	if (!changes.success || !changes.files) {
		console.error(chalk.red(`❌ Error: ${changes.error}`));
		return "";
	}

	console.log(chalk.blueBright("\n🧠 Agent 007 Review Start\n"));

	for (const file of changes.files) {
		console.log(chalk.bold(`File: ${file.path}`));

		const diffContent = [
			...(file.stagedDiffs || []),
			...(file.unstagedDiffs || []),
		].join("\n");

		if (!diffContent.trim()) {
			console.log(chalk.gray("No diff content available.\n"));
			continue;
		}

		const reviewPrompt = `
You are an audit-grade AI code reviewer.

Review the following Git diff for: ${file.path}

Provide structured feedback:
1. Security issues
2. Bugs
3. Performance improvements
4. Code quality / style

Diff:
${diffContent}
`;

		const result = streamText({
			model,
			prompt: reviewPrompt,
			system: SYSTEM_PROMPT,
		});

		for await (const chunk of result.textStream) {
			process.stdout.write(chalk.white(chunk));
			output += chunk;
		}

		console.log("\n");
	}

	console.log(chalk.greenBright("\n✅ Review Complete\n"));
	return output;
};

// 🚀 CLI run
if (import.meta.main) {
	await codeReviewAgent();
}
