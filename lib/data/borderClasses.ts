import generateBorderColorClasses from "@/lib/utils/colors/generateBorderColorClasses";
import type { ClassMapping } from "@/types";

export default {
	// Border radius
	rounded: { _uiElement: "corner", radius: 4 },
	"rounded-sm": { _uiElement: "corner", radius: 2 },
	"rounded-md": { _uiElement: "corner", radius: 6 },
	"rounded-lg": { _uiElement: "corner", radius: 8 },
	"rounded-xl": { _uiElement: "corner", radius: 12 },
	"rounded-2xl": { _uiElement: "corner", radius: 16 },
	"rounded-full": { _uiElement: "corner", radius: 9999 },

	// Border utilities
	border: { _uiElement: "stroke", thickness: 1 },
	"border-2": { _uiElement: "stroke", thickness: 2 },
	"border-4": { _uiElement: "stroke", thickness: 4 },
	"border-8": { _uiElement: "stroke", thickness: 8 },

	// Shadow utilities
	shadow: { _uiElement: "stroke", thickness: 1, transparency: 0.1 },
	"shadow-lg": { _uiElement: "stroke", thickness: 2, transparency: 0.1 },

	// Border colors - generates all color variations
	...generateBorderColorClasses(),
} as Record<string, ClassMapping>;
