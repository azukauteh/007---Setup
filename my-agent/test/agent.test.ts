import { describe, expect, it } from "bun:test";
import { codeReviewAgent } from "../index";

describe("Agent 007", () => {
	it("returns a string when given a prompt", async () => {
		const prompt = "Review the code changes in './nonexistent-folder'";

		const result = await codeReviewAgent(prompt);

		expect(typeof result).toBe("string");
		expect(result.length).toBeGreaterThan(0);
	});

	it("does not crash without a prompt (CLI mode)", async () => {
		const result = await codeReviewAgent();

		expect(typeof result).toBe("string");
	});
});
