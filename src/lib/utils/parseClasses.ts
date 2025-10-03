/**
 * Parse className string into properties and UI elements
 */

import type ClassMapping from "../../types/ClassMapping";
import type _UDim2 from "../../types/internal/_UDim2";

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
	const size: _UDim2 = {};
	const automaticSizeValues: string[] = [];

	for (const cls of classes) {
		const mapping = classMapToUse[cls];
		if (mapping) {
			if (mapping._uiElement) {
				let elementConfig: Record<string, unknown>;
				if (typeof mapping._uiElement === "string") {
					elementConfig = { type: mapping._uiElement };
				} else {
					elementConfig = { ...mapping._uiElement };
				}
				const elementType = elementConfig.type as string;
				if (!uiElementsMap[elementType]) {
					uiElementsMap[elementType] = elementConfig;
				} else {
					// Merge properties for the same UI element type
					Object.keys(elementConfig).forEach((key) => {
						uiElementsMap[elementType][key] = elementConfig[key];
					});
				}
			} else if (mapping.Size) {
				// Handle Size property specially to merge X and Y
				if (mapping.Size.X) size.X = mapping.Size.X;
				if (mapping.Size.Y) size.Y = mapping.Size.Y;
			} else if (mapping.AutomaticSize) {
				automaticSizeValues.push(mapping.AutomaticSize as string);
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
	const uiElements = Object.keys(uiElementsMap).map((key) => uiElementsMap[key]);

	// Build final Size if either x or y was specified
	if (size.X || size.Y) {
		(properties as Record<string, unknown>).Size = {
			X: size.X || { Scale: 0, Offset: 0 },
			Y: size.Y || { Scale: 0, Offset: 0 },
		};
	}

	if (automaticSizeValues.length > 0) {
		const hasX = automaticSizeValues.indexOf("X") !== -1;
		const hasY = automaticSizeValues.indexOf("Y") !== -1;

		if (hasX && hasY) {
			(properties as Record<string, unknown>).AutomaticSize = "XY";
		} else if (hasY) {
			(properties as Record<string, unknown>).AutomaticSize = "Y";
		} else if (hasX) {
			(properties as Record<string, unknown>).AutomaticSize = "X";
		} else {
			(properties as Record<string, unknown>).AutomaticSize = automaticSizeValues[automaticSizeValues.length - 1];
		}
	}

	return { properties, uiElements };
}
