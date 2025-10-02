import "@rbxts/types";

import type _UDim from "types/internal/_UDim";

type _UICorner = Omit<UICorner, "CornerRadius"> & {
	CornerRadius: _UDim;
};

export default _UICorner;
