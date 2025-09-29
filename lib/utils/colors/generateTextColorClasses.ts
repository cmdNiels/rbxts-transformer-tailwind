import { ClassMapping } from "../../../types";
import { tailwindColors } from "../../data/tailwindColors";

export default function generateTextColorClasses(includeColors?: string[]): Record<string, ClassMapping> {
	const classes: Record<string, ClassMapping> = {};

	const colorsToUse = includeColors || Object.keys(tailwindColors);

	for (const colorName of colorsToUse) {
		if (tailwindColors[colorName]) {
			const className = `text-${colorName}`;
			classes[className] = {
				TextColor3: tailwindColors[colorName],
			};
		}
	}

	return classes;
}
