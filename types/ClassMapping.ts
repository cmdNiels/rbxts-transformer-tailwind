import UDimValue from "./UDimValue";

interface ClassMapping {
	[key: string]: unknown;
	Size?: {
		x?: UDimValue;
		y?: UDimValue;
	};
	_uiElement?: string;
}

export default ClassMapping;
