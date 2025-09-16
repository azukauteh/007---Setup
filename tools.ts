import { tool } from "ai";
import { simpleGit } from "simple-git";
import { z } from "zod";

/**
 * List of files or directories to exclude from diff analysis.
 */
const excludeFiles = ["dist", "bun.lock"];

/**
 * Zod schema defining the expected input for the tool.
 * Requires a non-empty string representing the root directory.
 */
const fileChange = z.object({
  rootDir: z.string().min(1).describe("The root directory"),
});

type FileChange = z.infer<typeof fileChange>;

/**
 * Retrieves the list of changed files and their diffs from a Git repository.
 *
 * @param {FileChange} param0 - Object containing the root directory path.
 * @returns {Promise<Array<{ file: string; diff: string }>>} - Array of file diffs.
 *
 * Excludes files listed in `excludeFiles`. Uses `simple-git` to get a summary
 * of changes and fetches the diff for each file.
 */
async function getFileChangesInDirectory({ rootDir }: FileChange) {
  const git = simpleGit(rootDir);
  const summary = await git.diffSummary();
  const diffs: { file: string; diff: string }[] = [];

  for (const file of summary.files) {
    if (excludeFiles.includes(file.file)) continue; // Skip excluded files
    const diff = await git.diff(["--", file.file]);
    diffs.push({ file: file.file, diff });
  }

  return diffs;
}

/**
 * AI tool wrapper for retrieving Git file changes.
 *
 * - Description: "Gets the code changes made in given directory"
 * - Input: Validated using Zod schema `fileChange`
 * - Execution: Calls `getFileChangesInDirectory`
 */
export const getFileChangesInDirectoryTool = tool({
  description: "Gets the code changes made in given directory",
  inputSchema: fileChange,
  execute: getFileChangesInDirectory,
});
