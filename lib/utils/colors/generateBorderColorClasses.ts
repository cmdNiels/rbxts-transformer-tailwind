import type { ClassMapping } from "../../../types";
import { tailwindColors } from "../../data/tailwindColors";

/**
 * Generates border color classes with special handling for border elements
 */
export default function generateBorderColorClasses(includeColors?: string[]): Record<string, ClassMapping> {
	const classes: Record<string, ClassMapping> = {};

	const colorsToUse = includeColors || Object.keys(tailwindColors);

	for (const colorName of colorsToUse) {
		if (tailwindColors[colorName]) {
			const className = `border-${colorName}`;
			classes[className] = {
				_uiElement: {
					type: "UIStroke",
					color: tailwindColors[colorName],
				},
			};
		}
	}

	return classes;
}
