/**
 * Create class mappings with Tailwind config support
 */

import widthClasses from "../data/widthClasses";
import heightClasses from "../data/heightClasses";
import backgroundClasses from "../data/backgroundClasses";
import textClasses from "../data/textClasses";
import spacingClasses from "../data/spacingClasses";
import borderClasses from "../data/borderClasses";
import typographyClasses from "../data/typographyClasses";
import layoutClasses from "../data/layoutClasses";
import gapClasses from "../data/gapClasses";
import imageClasses from "../data/imageClasses";
import placeholderClasses from "../data/placeholderClasses";
import ClassMapping from "../../types/ClassMapping";
import TailwindConfig from "../../types/TailwindConfig";
import hexToRgb from "./hexToRgb";

/**
 * Create class mappings with Tailwind config support
 * @param tailwindConfig - Optional Tailwind configuration
 * @returns Complete class mapping object
 */
export default function createClassMap(
	tailwindConfig: TailwindConfig | undefined = undefined,
): Record<string, ClassMapping> {
	const baseMap: Record<string, ClassMapping> = {
		...widthClasses,
		...heightClasses,
		...backgroundClasses,
		...textClasses,
		...spacingClasses,
		...borderClasses,
		...typographyClasses,
		...layoutClasses,
		...gapClasses,
		...imageClasses,
		...placeholderClasses,
	};

	// Extend with Tailwind config if available
	if (tailwindConfig?.theme?.extend?.colors) {
		for (const [colorName, colorValue] of Object.entries(tailwindConfig.theme.extend.colors)) {
			if (typeof colorValue === "string") {
				const rgb = hexToRgb(colorValue);
				if (rgb) {
					baseMap[`bg-${colorName}`] = { BackgroundColor3: rgb };
					baseMap[`text-${colorName}`] = { TextColor3: rgb };
					baseMap[`image-${colorName}`] = { ImageColor3: rgb };
					baseMap[`placeholder-${colorName}`] = { PlaceholderColor3: rgb };
					baseMap[`border-${colorName}`] = {
						_uiElement: "stroke",
						thickness: 1,
						color: rgb,
					};
				}
			}
		}
	}

	// Return the class map with Tailwind config extensions
	return baseMap;
}
