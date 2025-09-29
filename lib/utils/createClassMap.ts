/**
 * Create class mappings with Tailwind config support
 */

import backgroundClasses from "@/lib/data/backgroundClasses";
import borderClasses from "@/lib/data/borderClasses";
import gapClasses from "@/lib/data/gapClasses";
import heightClasses from "@/lib/data/heightClasses";
import imageClasses from "@/lib/data/imageClasses";
import layoutClasses from "@/lib/data/layoutClasses";
import paddingClasses from "@/lib/data/paddingClasses";
import placeholderClasses from "@/lib/data/placeholderClasses";
import textClasses from "@/lib/data/textClasses";
import typographyClasses from "@/lib/data/typographyClasses";
import widthClasses from "@/lib/data/widthClasses";
import type ClassMapping from "@/types/ClassMapping";
import type TailwindConfig from "@/types/TailwindConfig";

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
		...paddingClasses,
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
