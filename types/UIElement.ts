import type RGBColor from "./RGBColor";

export default interface UIElement {
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
