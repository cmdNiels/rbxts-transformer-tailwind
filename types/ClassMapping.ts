import type UDimValue from "./UDimValue";
import type UIElement from "./UIElement";

export default interface ClassMapping {
	[key: string]: unknown;
	Size?: {
		x?: UDimValue;
		y?: UDimValue;
	};
	_uiElement?: UIElement;
}
