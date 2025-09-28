/**
 * Type definitions for rbxts-transformer-tailwind
 */

export interface TailwindTransformerConfig {
	/** Path to tailwind config (optional) */
	tailwindConfigPath?: string;
	/** Whether to warn about unknown classes */
	warnUnknownClasses?: boolean;
}

export interface RGBColor {
	r: number;
	g: number;
	b: number;
}

export interface UDimValue {
	scale: number;
	offset: number;
}

export interface SizeValue {
	x?: UDimValue;
	y?: UDimValue;
}

export interface ClassMapping {
	[key: string]: unknown;
	Size?: {
		x?: UDimValue;
		y?: UDimValue;
	};
	_uiElement?: string;
}

export interface TailwindConfig {
	theme?: {
		extend?: {
			colors?: Record<string, string>;
		};
	};
}

export interface UIElement {
	type: string;
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
	vertical?: number;
	horizontal?: number;
	all?: number;
	radius?: number;
	direction?: string;
	spacing?: number;
	horizontalAlignment?: string;
	verticalAlignment?: string;
	thickness?: number;
	color?: RGBColor;
	transparency?: number;
}
