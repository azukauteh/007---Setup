/**
 * Generates a conventional commit message based on a list of changes and optional context.
 *
 * @param changes - An array of change descriptions (e.g., ["add markdown writer", "refactor tools.ts"])
 * @param context - Optional context to determine commit type (e.g., "fix", "chore", "docs", "refactor")
 * @returns A formatted commit message string (e.g., "feat: add markdown writer, refactor tools.ts")
 *
 * @example
 * generateCommitMessage(["add tests", "update README"], "chore");
 * // "chore: add tests, update README"
 */
export function generateCommitMessage(changes: string[], context?: string): string {
    const defaultType = "feat";
  
    // Normalize context to match conventional commit types
    const validTypes = ["feat", "fix", "chore", "docs", "refactor", "test", "style"];
    const type = context && validTypes.includes(context) ? context : defaultType;
  
    const summary = changes.length > 0
      ? changes.map(change => change.trim()).join(", ")
      : "initial setup";
  
    return `${type}: ${summary}`;
  }
  