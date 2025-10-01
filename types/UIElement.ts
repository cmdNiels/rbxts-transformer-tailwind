import type UIBorder from "./UIBorder";
import type UILayout from "./UILayout";
import type UIPadding from "./UIPadding";
import type UIVisual from "./UIVisual";

export default interface UIElement extends UIPadding, UIBorder, UILayout, UIVisual {
	type: string;
}
