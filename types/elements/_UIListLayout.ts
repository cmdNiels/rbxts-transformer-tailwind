import "@rbxts/types";

type _UIListLayout = Omit<
	UIListLayout,
	"Direction" | "Spacing" | "HorizontalAlignment" | "VerticalAlignment" | "Wraps" | "FlexAlignment"
> & {
	Direction?: string;
	Spacing?: number;
	HorizontalAlignment?: string;
	VerticalAlignment?: string;
	Wraps?: boolean;
	FlexAlignment?: string;
};

export default _UIListLayout;
