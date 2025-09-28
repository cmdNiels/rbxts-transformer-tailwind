/**
 * Load Tailwind configuration from project directory
 */

import * as path from "path";
import * as fs from "fs";
import TailwindConfig from "../../types/TailwindConfig";

/**
 * Load Tailwind configuration from project directory
 * @param projectRoot - The root directory of the project
 * @param configPath - Optional specific path to config file
 * @returns The loaded Tailwind configuration or undefined if not found
 */
export default function loadTailwindConfig(projectRoot: string, configPath?: string): TailwindConfig | undefined {
	const configPaths = configPath
		? [configPath]
		: ["tailwind.config.js", "tailwind.config.ts", "tailwind.config.cjs", "tailwind.config.mjs"];

	for (const configPath of configPaths) {
		const fullPath = path.isAbsolute(configPath) ? configPath : path.join(projectRoot, configPath);
		if (fs.existsSync(fullPath)) {
			try {
				// Clear require cache to ensure fresh config
				delete require.cache[require.resolve(fullPath)];
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				return require(fullPath) as TailwindConfig;
			} catch (e) {
				console.warn(`Failed to load Tailwind config from ${fullPath}:`, e);
			}
		}
	}
	return undefined;
}
