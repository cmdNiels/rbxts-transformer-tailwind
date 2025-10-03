import type _Color3 from "./internal/_Color3";

export default interface TailwindConfig {
	theme?: {
		extend?: {
			colors?: Record<string, _Color3>;
		};
	};
}
