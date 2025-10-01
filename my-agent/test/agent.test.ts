// agent.test.ts
// 🧪 Tests for Agent 007 behavior on edge-case prompts

import { test, expect } from "bun:test";
import { codeReviewAgent } from "../index";

test(
	"Agent handles invalid directory path",
	async () => {
		const prompt = "Review the code changes in './nonexistent-folder'";
		const result = await codeReviewAgent(prompt);

		expect(result).toBeDefined();
		expect(typeof result).toBe("string");

		// ✅ Match any phrasing Gemini might use
		expect(result.toLowerCase()).toMatch(
			/(can't find|does not exist|invalid|please double-check)/i,
		);
	},
	{ timeout: 10000 },
);

test("Agent handles invalid directory path", async () => {
	const prompt = "Review the code changes in './nonexistent-folder'";
	const result = await codeReviewAgent(prompt);

	expect(result).toBeDefined();
	expect(typeof result).toBe("string");

	// Gemini fallback message for nonexistent folder
	expect(result.toLowerCase()).toMatch(
		/directory.*does not exist|provide.*valid directory/i,
	);
});
