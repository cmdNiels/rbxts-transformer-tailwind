/**
 * Parse className string into properties and UI elements
 */

import ClassMapping from "../../types/ClassMapping";
import SizeValue from "../../types/SizeValue";

/**
 * Parse className string into properties and UI elements
 * @param classNames - Space-separated string of class names
 * @param classMapToUse - Class mapping object to use for parsing
 * @param warnUnknown - Whether to warn about unknown classes
 * @returns Object containing properties and uiElements arrays
 */
export default function parseClasses(
	classNames: string,
	classMapToUse: Record<string, ClassMapping>,
	warnUnknown = false,
): { properties: unknown; uiElements: unknown[] } {
	const classes = classNames.split(" ").filter((c) => c !== "");
	const properties: unknown = {};
	const uiElementsMap: Record<string, Record<string, unknown>> = {};
	const size: SizeValue = { x: undefined, y: undefined };

	for (const cls of classes) {
		const mapping = classMapToUse[cls];
		if (mapping) {
			if (mapping._uiElement) {
				const elementType = mapping._uiElement;
				if (!uiElementsMap[elementType]) {
					uiElementsMap[elementType] = { type: elementType };
				}
				// Merge properties for the same UI element type
				for (const key of Object.keys(mapping)) {
					if (key !== "_uiElement" && Object.prototype.hasOwnProperty.call(mapping, key)) {
						uiElementsMap[elementType][key] = mapping[key];
					}
				}
			} else if (mapping.Size) {
				// Handle Size property specially to merge x and y
				if (mapping.Size.x) size.x = mapping.Size.x;
				if (mapping.Size.y) size.y = mapping.Size.y;
			} else {
				for (const key of Object.keys(mapping)) {
					if (Object.prototype.hasOwnProperty.call(mapping, key)) {
						(properties as Record<string, unknown>)[key] = mapping[key];
					}
				}
			}
		} else if (warnUnknown) {
			console.warn(`Unknown Tailwind class: ${cls}`);
		}
	}

	// Convert uiElementsMap back to array
	const uiElements = Object.values(uiElementsMap);

	// Build final Size if either x or y was specified
	if (size.x || size.y) {
		(properties as Record<string, unknown>).Size = {
			x: size.x || { scale: 0, offset: 0 },
			y: size.y || { scale: 0, offset: 0 },
		};
	}

	return { properties, uiElements };
}
