import type ClassMapping from "../../../types/ClassMapping";
import { tailwindColors } from "../../data/tailwindColors";

/**
 * Generates image color classes for ImageLabel and ImageButton elements
 */
export default function generateImageColorClasses(includeColors?: string[]): Record<string, ClassMapping> {
	const classes: Record<string, ClassMapping> = {};

	const colorsToUse = includeColors || Object.keys(tailwindColors);

	for (const colorName of colorsToUse) {
		if (tailwindColors[colorName]) {
			const className = `image-${colorName}`;
			classes[className] = {
				ImageColor3: tailwindColors[colorName],
			};
		}
	}

	return classes;
}
