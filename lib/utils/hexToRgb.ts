/**
 * Convert hex color string to RGB color object
 */

import type _Color3 from "types/internal/_Color3";

/**
 * Convert hex color string to RGB color object
 * @param hex - Hex color string (with or without #)
 * @returns RGB color object or undefined if invalid hex
 */
export default function hexToRgb(hex: string): _Color3 | undefined {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				R: parseInt(result[1], 16) / 255,
				G: parseInt(result[2], 16) / 255,
				B: parseInt(result[3], 16) / 255,
			}
		: undefined;
}
