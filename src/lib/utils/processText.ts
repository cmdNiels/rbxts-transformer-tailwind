/**
 * Processes text with both transform and decoration in one function
 * @param text - The text content to process
 * @param textTransform - Text transform type (uppercase, lowercase, capitalize, none)
 * @param textDecoration - Text decoration type (underline, line-through, overline, none)
 * @returns Processed text content
 */
export default function processText(text: string, textTransform?: string, textDecoration?: string): string {
	let processedText = text;

	// Apply text transform first
	if (textTransform) {
		switch (textTransform) {
			case "uppercase":
				processedText = processedText.toUpperCase();
				break;
			case "lowercase":
				processedText = processedText.toLowerCase();
				break;
			case "capitalize":
				processedText = processedText
					.toLowerCase()
					.split(" ")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" ");
				break;
			case "none":
			default:
				// No transformation
				break;
		}
	}

	// Then apply text decoration (wrapping with XML tags)
	if (textDecoration) {
		switch (textDecoration) {
			case "underline":
				processedText = `<u>${processedText}</u>`;
				break;
			case "overline":
				// Roblox doesn't have native overline, but we can simulate with underline
				processedText = `<u>${processedText}</u>`;
				break;
			case "line-through":
				processedText = `<s>${processedText}</s>`;
				break;
			case "none":
			default:
				// No decoration
				break;
		}
	}

	return processedText;
}
