import "@rbxts/types";

import type _Color3 from "types/internal/_Color3";

type _UIStroke = Omit<UIStroke, "Radius" | "Color"> & {
	Radius?: number;
	Color?: _Color3;
};

export default _UIStroke;
