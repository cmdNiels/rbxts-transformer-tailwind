import "@rbxts/types";

type _UIFlexItem = Omit<UIFlexItem, "FlexMode" | "GrowRatio" | "ShrinkRatio"> & {
	FlexMode?: string;
	GrowRatio?: number;
	ShrinkRatio?: number;
};

export default _UIFlexItem;
