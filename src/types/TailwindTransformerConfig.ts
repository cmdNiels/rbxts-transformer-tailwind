export default interface TailwindTransformerConfig {
	/** Path to tailwind config (optional) */
	tailwindConfigPath?: string;
	/** Whether to warn about unknown classes */
	warnUnknownClasses?: boolean;
}
