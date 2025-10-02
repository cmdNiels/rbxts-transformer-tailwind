import "@rbxts/types";

import type _UDim from "types/internal/_UDim";

type _UIPadding = Omit<UIPadding, "PaddingBottom" | "PaddingLeft" | "PaddingRight" | "PaddingTop"> & {
	PaddingBottom: _UDim;
	PaddingLeft: _UDim;
	PaddingRight: _UDim;
	PaddingTop: _UDim;
};

export default _UIPadding;
