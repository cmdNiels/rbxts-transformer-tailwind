import type ClassMapping from "../../../types/ClassMapping";
import { tailwindColors } from "../../data/tailwindColors";

/**
 * Generates placeholder color classes for TextBox elements
 */
export default function generatePlaceholderColorClasses(includeColors?: string[]): Record<string, ClassMapping> {
	const classes: Record<string, ClassMapping> = {};

	const colorsToUse = includeColors || Object.keys(tailwindColors);

	for (const colorName of colorsToUse) {
		if (tailwindColors[colorName]) {
			const className = `placeholder-${colorName}`;
			classes[className] = {
				PlaceholderColor3: tailwindColors[colorName],
			};
		}
	}

	return classes;
}
