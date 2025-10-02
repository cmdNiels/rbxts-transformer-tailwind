import "@rbxts/types";

type _UIScale = Omit<UIScale, "Scale"> & {
	Scale: number;
};

export default _UIScale;
