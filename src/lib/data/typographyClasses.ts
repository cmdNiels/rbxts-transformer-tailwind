import type ClassMapping from "../../types/ClassMapping";

export default {
	// Text alignment
	"text-left": { TextXAlignment: "Left" },
	"text-center": { TextXAlignment: "Center" },
	"text-right": { TextXAlignment: "Right" },
	"text-start": { TextYAlignment: "Top" },
	"text-justify": { TextYAlignment: "Center" },
	"text-end": { TextYAlignment: "Bottom" },

	// Text sizes
	"text-xs": { TextSize: 10 },
	"text-sm": { TextSize: 12 },
	"text-base": { TextSize: 14 },
	"text-lg": { TextSize: 16 },
	"text-xl": { TextSize: 18 },
	"text-2xl": { TextSize: 24 },
	"text-3xl": { TextSize: 30 },
	"text-4xl": { TextSize: 36 },
	"text-5xl": { TextSize: 48 },
	"text-6xl": { TextSize: 60 },
	"text-7xl": { TextSize: 72 },
	"text-8xl": { TextSize: 96 },
	"text-9xl": { TextSize: 128 },

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

	// Text decoration (requires special handling in transformer)
	underline: { _textDecoration: "underline", RichText: true },
	overline: { _textDecoration: "overline", RichText: true },
	"line-through": { _textDecoration: "line-through", RichText: true },
	"no-underline": { _textDecoration: "none", RichText: true },

	// Text transform (requires special handling in transformer)
	uppercase: { _textTransform: "uppercase" },
	lowercase: { _textTransform: "lowercase" },
	capitalize: { _textTransform: "capitalize" },
	"normal-case": { _textTransform: "none" },
} as Record<string, ClassMapping>;
