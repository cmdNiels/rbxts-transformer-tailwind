export default interface TailwindConfig {
	theme?: {
		extend?: {
			colors?: Record<string, string>;
		};
	};
}
