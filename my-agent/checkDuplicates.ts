/** checkDuplicates.ts
 *🧹 Utility to detect duplicate filenames in a directory
 */

import fs from "node:fs";
import path from "node:path";

export const checkForDuplicateFiles = (dir: string) => {
	try {
		const files = fs.readdirSync(dir);

		const seen = new Set<string>();
		const duplicates: string[] = [];

		for (const file of files) {
			const name = path.basename(file);

			if (seen.has(name)) {
				duplicates.push(name);
			} else {
				seen.add(name);
			}
		}

		if (duplicates.length > 0) {
			console.log("\n⚠️ Duplicate files found:");

			for (const d of duplicates) {
				console.log(`- ${d}`);
			}
		} else {
			console.log("\n✅ No duplicate files found.");
		}
	} catch (err) {
		console.error(`❌ Failed to scan directory: ${dir}`);
		console.error(err);
	}
};
