import type { ClassMapping } from "../../../types";
import { tailwindColors } from "../../data/tailwindColors";

/**
 * Generates Tailwind color classes for a specific property
 *
 * @param prefix The class prefix (e.g., 'bg', 'text', 'border')
 * @param property The Roblox property name (e.g., 'BackgroundColor3', 'TextColor3', 'BorderColor3')
 * @param includeColors Optional array of specific colors to include. If not provided, includes all colors
 * @returns Record of class names to their mappings
 */
export default function generateBackgroundColorClasses(includeColors?: string[]): Record<string, ClassMapping> {
	const classes: Record<string, ClassMapping> = {};

	const colorsToUse = includeColors || Object.keys(tailwindColors);

	for (const colorName of colorsToUse) {
		if (tailwindColors[colorName]) {
			const className = `bg-${colorName}`;
			classes[className] = {
				BackgroundColor3: tailwindColors[colorName],
			};
		}
	}

	return classes;
}
