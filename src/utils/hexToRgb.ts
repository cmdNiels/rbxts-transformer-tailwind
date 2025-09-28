/**
 * Convert hex color string to RGB color object
 */

import type { RGBColor } from "../types";

/**
 * Convert hex color string to RGB color object
 * @param hex - Hex color string (with or without #)
 * @returns RGB color object or undefined if invalid hex
 */
export default function hexToRgb(hex: string): RGBColor | undefined {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16) / 255,
				g: parseInt(result[2], 16) / 255,
				b: parseInt(result[3], 16) / 255,
		  }
		: undefined;
}
