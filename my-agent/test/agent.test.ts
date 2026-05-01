import { expect, test } from "bun:test";
import { codeReviewAgent } from "../index";

test("Agent handles invalid directory path", async () => {
	const prompt = "Review the code changes in './nonexistent-folder'";
	const result = await codeReviewAgent(prompt);

	expect(result).toBeDefined();
	expect(typeof result).toBe("string");

	expect(result.toLowerCase()).toMatch(
		/(can't find|does not exist|invalid|please double-check|directory.*does not exist|provide.*valid directory)/i,
	);
});
