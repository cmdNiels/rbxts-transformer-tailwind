import type UIElement from "./elements/_UIElement";
import type _UDim2 from "./internal/_UDim2";

export default interface ClassMapping {
	[key: string]: unknown;
	Size?: _UDim2;
	_uiElement?: UIElement;
}
