import path from "node:path";
import simpleGit from "simple-git";

const git = simpleGit();

export async function getFileChangesInDirectoryTool(_dir: string) {
	try {
		const repoRoot = path.resolve(process.cwd());
		await git.cwd(repoRoot);

		const unstagedDiff = await git.diff();
		const stagedDiff = await git.diff(["--cached"]);
		const status = await git.status();

		function extractFileDiffs(diff: string) {
			return diff
				.split(/^diff --git/m)
				.filter(Boolean)
				.map((chunk) => `diff --git${chunk}`);
		}

		const files = status.files.map((file) => ({
			path: file.path,
			indexStatus: file.index,
			workingStatus: file.working_dir,
			stagedDiffs: extractFileDiffs(stagedDiff).filter((d) =>
				d.includes(file.path),
			),
			unstagedDiffs: extractFileDiffs(unstagedDiff).filter((d) =>
				d.includes(file.path),
			),
		}));

		return { success: true, repo: repoRoot, files };
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { success: false, error: error.message };
		}
		return { success: false, error: String(error) };
	}
}
