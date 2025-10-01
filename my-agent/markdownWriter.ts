import { writeFileSync } from "fs";
import { resolve } from "path";

/**
 * Generates a Markdown file with a title and multiple sections.
 *
 * @param title - The main title of the document (used as H1)
 * @param sections - A record of section headings and their content
 * @param fileName - Optional output filename (default: "README.generated.md")
 *
 * @example
 * generateMarkdown("Release Notes", {
 *   "v0.1.0": "- Initial commit\n- Added markdown generator",
 *   "Next Steps": "- Add changelog support\n- Integrate with CI"
 * });
 */
export function generateMarkdown(
	title: string,
	sections: Record<string, string>,
	fileName = "README.generated.md",
): void {
	let content = `# ${title}\n\n`;

	for (const [heading, body] of Object.entries(sections)) {
		const cleanHeading = heading.trim();
		const cleanBody = body.trim();
		content += `## ${cleanHeading}\n\n${cleanBody}\n\n`;
	}

	const outputPath = resolve(process.cwd(), fileName);
	writeFileSync(outputPath, content, "utf8");
}
