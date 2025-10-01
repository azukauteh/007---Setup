// tools.ts
// 🧠 Agent 007 Tool: Get file changes and diffs from a Git directory

export const getFileChangesInDirectoryTool = {
	name: "getFileChangesInDirectoryTool",
	description: "Returns changed files and their diffs in a directory",
	parameters: {
		type: "object",
		properties: {
			rootDir: {
				type: "string",
				description: "The root directory to check for changes",
			},
		},
		required: ["rootDir"],
	},
	execute: async ({ rootDir }: { rootDir: string }) => {
		const { simpleGit } = await import("simple-git");
		const git = simpleGit(rootDir);

		const summary = await git.diffSummary();
		const diff = await git.diff();

		return summary.files.map((f) => ({
			file: f.file,
			diff,
		}));
	},
};
