/**
 * Wraps text content with text decoration XML tags for Roblox RichText
 * @param text - The text content to wrap
 * @param decoration - The text decoration type
 * @returns Wrapped text content
 */
export default function wrapTextWithDecoration(text: string, decoration: string): string {
	switch (decoration) {
		case "underline":
			return `<u>${text}</u>`;
		case "overline":
			// Roblox doesn't have native overline, but we can simulate with a custom approach
			// For now, we'll use underline as the closest alternative
			return `<u>${text}</u>`;
		case "line-through":
			return `<s>${text}</s>`;
		case "none":
		default:
			return text;
	}
}
