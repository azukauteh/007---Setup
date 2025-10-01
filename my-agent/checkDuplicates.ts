// checkDuplicates.ts
// 🧹 Utility to detect duplicate filenames in a directory

import fs from "fs";
import path from "path";

export const checkForDuplicateFiles = (dir: string) => {
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
		for (const dup of duplicates) {
			console.log(`- ${dup}`);
		}
	} else {
		console.log("\n✅ No duplicate files found.");
	}
};
