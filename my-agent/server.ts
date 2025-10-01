/**
 * GitHub webhook listener for Agent 007 – Diff Review.
 *
 * This Bun-native HTTP server listens for GitHub pull request events and triggers
 * the `codeReviewAgent()` with the PR diff URL as input.
 *
 * 🔧 Setup:
 * - Must be exposed via a public URL (e.g. ngrok or deployed to Vercel)
 * - Set this URL as the Webhook URL in your GitHub App settings
 * - Ensure the app has permission to read pull requests and receive `pull_request` events
 *
 * 📦 Dependencies:
 * - Bun runtime (uses Bun.serve)
 * - `codeReviewAgent()` exported from `index.ts`
 *
 * 🧠 Behavior:
 * - Accepts only POST requests
 * - Filters for `pull_request` events with `action: opened`
 * - Extracts PR metadata and diff URL
 * - Constructs a prompt and streams review output via `codeReviewAgent()`
 *
 * 🔐 Security:
 * - Signature verification and rate limiting recommended for production
 */

import { z } from "zod";
import { codeReviewAgent } from "./index";

const { serve } = Bun;

// Define expected GitHub webhook payload shape
const webhookSchema = z.object({
	action: z.string(),
	pull_request: z.object({
		number: z.number(),
		diff_url: z.string().url(),
	}),
	repository: z.object({
		full_name: z.string(),
	}),
});

serve({
	port: 3000,
	fetch: async (req) => {
		if (req.method !== "POST") {
			return new Response("Only POST allowed", { status: 405 });
		}

		const event = req.headers.get("x-github-event");
		const raw = await req.json();

		try {
			const body = webhookSchema.parse(raw);

			if (event === "pull_request" && body.action === "opened") {
				const diffUrl = body.pull_request.diff_url;
				const repo = body.repository.full_name;
				const prNumber = body.pull_request.number;

				console.log(`🔍 Reviewing PR #${prNumber} in ${repo}`);

				const prompt = `Review this PR diff:\n${diffUrl}`;
				await codeReviewAgent(prompt);

				return new Response("Review triggered", { status: 200 });
			}

			return new Response("Event ignored", { status: 200 });
		} catch (err) {
			console.error("❌ Invalid webhook payload:", err);
			return new Response("Invalid payload", { status: 400 });
		}
	},
});
