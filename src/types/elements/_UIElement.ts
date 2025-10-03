import type _UICorner from "./_UICorner";
import type _UIFlexItem from "./_UIFlexItem";
import type _UIListLayout from "./_UIListLayout";
import type _UIPadding from "./_UIPadding";
import type _UIScale from "./_UIScale";
import type _UIStroke from "./_UIStroke";

type UIElement =
	| ({ type: "UICorner" } & Partial<_UICorner>)
	| ({ type: "UIFlexItem" } & Partial<_UIFlexItem>)
	| ({ type: "UIListLayout" } & Partial<_UIListLayout>)
	| ({ type: "UIPadding" } & Partial<_UIPadding>)
	| ({ type: "UIStroke" } & Partial<_UIStroke>)
	| ({ type: "UIScale" } & Partial<_UIScale>);

export default UIElement;
