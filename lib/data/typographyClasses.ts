import type { ClassMapping } from "../../types";

export default {
	// Text alignment
	"text-left": { TextXAlignment: "Left" },
	"text-center": { TextXAlignment: "Center" },
	"text-right": { TextXAlignment: "Right" },
	"text-start": { TextYAlignment: "Left" },
	"text-justify": { TextYAlignment: "Center" },
	"text-end": { TextYAlignment: "Right" },

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
	"font-thin": { FontWeight: "Thin" },
	"font-extralight": { FontWeight: "ExtraLight" },
	"font-light": { FontWeight: "Light" },
	"font-normal": { FontWeight: "Regular" },
	"font-medium": { FontWeight: "Medium" },
	"font-semibold": { FontWeight: "SemiBold" },
	"font-bold": { FontWeight: "Bold" },
	"font-extrabold": { FontWeight: "ExtraBold" },
	"font-black": { FontWeight: "Heavy" },

	// Font families
	"font-gotham": { FontFamily: "rbxasset://fonts/families/GothamSSm.json" },
	"font-arial": { FontFamily: "rbxasset://fonts/families/Arial.json" },
	"font-roboto": { FontFamily: "rbxasset://fonts/families/Roboto.json" },
	"font-source-sans": { FontFamily: "rbxasset://fonts/families/SourceSansPro.json" },

	// Font styles
	italic: { FontStyle: "Italic" },
	"not-italic": { FontStyle: "Normal" },
} as Record<string, ClassMapping>;
