import UDimValue from "./UDimValue";

export default interface ClassMapping {
	[key: string]: unknown;
	Size?: {
		x?: UDimValue;
		y?: UDimValue;
	};
	_uiElement?: string;
}
