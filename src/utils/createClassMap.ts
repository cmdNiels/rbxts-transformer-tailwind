/**
 * Create class mappings with Tailwind config support
 */

import type { TailwindConfig, ClassMapping } from "../types";
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
		// Width utilities
		"w-4": { Size: { x: { scale: 0, offset: 16 } } },
		"w-8": { Size: { x: { scale: 0, offset: 32 } } },
		"w-16": { Size: { x: { scale: 0, offset: 64 } } },
		"w-32": { Size: { x: { scale: 0, offset: 128 } } },
		"w-48": { Size: { x: { scale: 0, offset: 192 } } },
		"w-64": { Size: { x: { scale: 0, offset: 256 } } },
		"w-96": { Size: { x: { scale: 0, offset: 384 } } },
		"w-full": { Size: { x: { scale: 1, offset: 0 } } },
		"w-1/2": { Size: { x: { scale: 0.5, offset: 0 } } },
		"w-1/3": { Size: { x: { scale: 1 / 3, offset: 0 } } },
		"w-2/3": { Size: { x: { scale: 2 / 3, offset: 0 } } },
		"w-1/4": { Size: { x: { scale: 0.25, offset: 0 } } },
		"w-3/4": { Size: { x: { scale: 0.75, offset: 0 } } },

		// Height utilities
		"h-auto": { AutomaticSize: "Y" },
		"h-4": { Size: { y: { scale: 0, offset: 16 } } },
		"h-8": { Size: { y: { scale: 0, offset: 32 } } },
		"h-10": { Size: { y: { scale: 0, offset: 40 } } },
		"h-12": { Size: { y: { scale: 0, offset: 48 } } },
		"h-16": { Size: { y: { scale: 0, offset: 64 } } },
		"h-20": { Size: { y: { scale: 0, offset: 80 } } },
		"h-32": { Size: { y: { scale: 0, offset: 128 } } },
		"h-48": { Size: { y: { scale: 0, offset: 192 } } },
		"h-64": { Size: { y: { scale: 0, offset: 256 } } },
		"h-96": { Size: { y: { scale: 0, offset: 384 } } },
		"h-full": { Size: { y: { scale: 1, offset: 0 } } },
		"h-1/2": { Size: { y: { scale: 0.5, offset: 0 } } },
		"h-1/3": { Size: { y: { scale: 1 / 3, offset: 0 } } },
		"h-2/3": { Size: { y: { scale: 2 / 3, offset: 0 } } },
		"h-1/4": { Size: { y: { scale: 0.25, offset: 0 } } },
		"h-3/4": { Size: { y: { scale: 0.75, offset: 0 } } },

		// Background colors
		"bg-transparent": { BackgroundTransparency: 1 },
		"bg-white": { BackgroundColor3: { r: 1, g: 1, b: 1 } },
		"bg-black": { BackgroundColor3: { r: 0, g: 0, b: 0 } },

		// Gray scale
		"bg-gray-50": { BackgroundColor3: { r: 0.976, g: 0.98, b: 0.984 } },
		"bg-gray-100": { BackgroundColor3: { r: 0.953, g: 0.957, b: 0.965 } },
		"bg-gray-200": { BackgroundColor3: { r: 0.898, g: 0.906, b: 0.922 } },
		"bg-gray-300": { BackgroundColor3: { r: 0.82, g: 0.835, b: 0.859 } },
		"bg-gray-400": { BackgroundColor3: { r: 0.612, g: 0.635, b: 0.671 } },
		"bg-gray-500": { BackgroundColor3: { r: 0.42, g: 0.447, b: 0.502 } },
		"bg-gray-600": { BackgroundColor3: { r: 0.294, g: 0.333, b: 0.388 } },
		"bg-gray-700": { BackgroundColor3: { r: 0.22, g: 0.247, b: 0.286 } },
		"bg-gray-800": { BackgroundColor3: { r: 0.122, g: 0.161, b: 0.216 } },
		"bg-gray-900": { BackgroundColor3: { r: 0.067, g: 0.09, b: 0.125 } },

		// Color scale for other colors
		"bg-red-500": { BackgroundColor3: { r: 0.937, g: 0.267, b: 0.267 } },
		"bg-orange-500": { BackgroundColor3: { r: 0.976, g: 0.451, b: 0.094 } },
		"bg-yellow-500": { BackgroundColor3: { r: 0.918, g: 0.702, b: 0.031 } },
		"bg-green-500": { BackgroundColor3: { r: 0.133, g: 0.773, b: 0.369 } },
		"bg-blue-500": { BackgroundColor3: { r: 0.231, g: 0.51, b: 0.965 } },
		"bg-indigo-500": { BackgroundColor3: { r: 0.388, g: 0.427, b: 0.937 } },
		"bg-purple-500": { BackgroundColor3: { r: 0.659, g: 0.333, b: 0.969 } },
		"bg-pink-500": { BackgroundColor3: { r: 0.925, g: 0.243, b: 0.518 } },

		// Text colors
		"text-white": { TextColor3: { r: 1, g: 1, b: 1 } },
		"text-black": { TextColor3: { r: 0, g: 0, b: 0 } },
		"text-gray-600": { TextColor3: { r: 0.294, g: 0.333, b: 0.388 } },
		"text-red-600": { TextColor3: { r: 0.863, g: 0.149, b: 0.157 } },
		"text-green-700": { TextColor3: { r: 0.082, g: 0.541, b: 0.259 } },
		"text-blue-800": { TextColor3: { r: 0.122, g: 0.267, b: 0.722 } },

		// Padding utilities
		"p-1": { _uiElement: "padding", all: 4 },
		"p-2": { _uiElement: "padding", all: 8 },
		"p-3": { _uiElement: "padding", all: 12 },
		"p-4": { _uiElement: "padding", all: 16 },
		"p-6": { _uiElement: "padding", all: 24 },
		"p-8": { _uiElement: "padding", all: 32 },
		"px-2": { _uiElement: "padding", horizontal: 8 },
		"px-4": { _uiElement: "padding", horizontal: 16 },
		"px-6": { _uiElement: "padding", horizontal: 24 },
		"py-2": { _uiElement: "padding", vertical: 8 },
		"py-4": { _uiElement: "padding", vertical: 16 },
		"py-6": { _uiElement: "padding", vertical: 24 },

		// Border radius
		rounded: { _uiElement: "corner", radius: 4 },
		"rounded-sm": { _uiElement: "corner", radius: 2 },
		"rounded-md": { _uiElement: "corner", radius: 6 },
		"rounded-lg": { _uiElement: "corner", radius: 8 },
		"rounded-xl": { _uiElement: "corner", radius: 12 },
		"rounded-2xl": { _uiElement: "corner", radius: 16 },
		"rounded-full": { _uiElement: "corner", radius: 9999 },

		// Text alignment
		"text-left": { TextXAlignment: "Left" },
		"text-center": { TextXAlignment: "Center" },
		"text-right": { TextXAlignment: "Right" },

		// Text sizes
		"text-xs": { TextSize: 10 },
		"text-sm": { TextSize: 12 },
		"text-base": { TextSize: 14 },
		"text-lg": { TextSize: 16 },
		"text-xl": { TextSize: 18 },
		"text-2xl": { TextSize: 24 },
		"text-3xl": { TextSize: 30 },
		"text-4xl": { TextSize: 36 },

		// Font weights
		"font-normal": { Font: "Gotham" },
		"font-medium": { Font: "GothamMedium" },
		"font-semibold": { Font: "GothamSemibold" },
		"font-bold": { Font: "GothamBold" },

		// Layout utilities
		flex: { _uiElement: "listLayout", direction: "Horizontal" },
		"flex-col": { _uiElement: "listLayout", direction: "Vertical" },
		"justify-center": { _uiElement: "listLayout", horizontalAlignment: "Center" },
		"justify-start": { _uiElement: "listLayout", horizontalAlignment: "Left" },
		"justify-end": { _uiElement: "listLayout", horizontalAlignment: "Right" },
		"items-center": { _uiElement: "listLayout", verticalAlignment: "Center" },
		"items-start": { _uiElement: "listLayout", verticalAlignment: "Top" },
		"items-end": { _uiElement: "listLayout", verticalAlignment: "Bottom" },

		// Gap utilities
		"gap-1": { _uiElement: "listLayout", spacing: 4 },
		"gap-2": { _uiElement: "listLayout", spacing: 8 },
		"gap-3": { _uiElement: "listLayout", spacing: 12 },
		"gap-4": { _uiElement: "listLayout", spacing: 16 },
		"gap-6": { _uiElement: "listLayout", spacing: 24 },
		"gap-8": { _uiElement: "listLayout", spacing: 32 },

		// Border utilities
		border: { _uiElement: "stroke", thickness: 1, color: { r: 0.82, g: 0.835, b: 0.859 } },
		"border-2": { _uiElement: "stroke", thickness: 2, color: { r: 0.82, g: 0.835, b: 0.859 } },
		shadow: { _uiElement: "stroke", thickness: 1, color: { r: 0, g: 0, b: 0 }, transparency: 0.1 },
		"shadow-lg": { _uiElement: "stroke", thickness: 2, color: { r: 0, g: 0, b: 0 }, transparency: 0.1 },
	};

	// Extend with Tailwind config if available
	if (tailwindConfig?.theme?.extend?.colors) {
		for (const [colorName, colorValue] of Object.entries(tailwindConfig.theme.extend.colors)) {
			if (typeof colorValue === "string") {
				const rgb = hexToRgb(colorValue);
				if (rgb) {
					baseMap[`bg-${colorName}`] = { BackgroundColor3: rgb };
					baseMap[`text-${colorName}`] = { TextColor3: rgb };
				}
			}
		}
	}

	// Return the class map with Tailwind config extensions
	return baseMap;
}
