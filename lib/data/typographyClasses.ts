import type { ClassMapping } from "../../types";

export default {
	// Text alignment
	"text-left": { TextXAlignment: "Left" },
	"text-center": { TextXAlignment: "Center" },
	"text-right": { TextXAlignment: "Right" },

	// Text sizes
	"text-xs": { TextSize: 10 },
	"text-sm": { TextSize: 12 },
	"text-base": { TextSize: 14 },
	"text-lg": { TextSize: 16 },
	"text-xl": { TextSize: 18 },
	"text-2xl": { TextSize: 24 },
	"text-3xl": { TextSize: 30 },
	"text-4xl": { TextSize: 36 },

	// Font weights
	"font-normal": { Font: "Gotham" },
	"font-medium": { Font: "GothamMedium" },
	"font-semibold": { Font: "GothamMedium" },
	"font-bold": { Font: "GothamBold" },
} as Record<string, ClassMapping>;
