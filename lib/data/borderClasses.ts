import type { ClassMapping } from "../../types";
import generateBorderColorClasses from "../utils/colors/generateBorderColorClasses";

export default {
	// Border radius
	"rounded-none": { _uiElement: "corner", radius: 0 },
	rounded: { _uiElement: "corner", radius: 4 },
	"rounded-sm": { _uiElement: "corner", radius: 2 },
	"rounded-md": { _uiElement: "corner", radius: 6 },
	"rounded-lg": { _uiElement: "corner", radius: 8 },
	"rounded-xl": { _uiElement: "corner", radius: 12 },
	"rounded-2xl": { _uiElement: "corner", radius: 16 },
	"rounded-3xl": { _uiElement: "corner", radius: 24 },
	"rounded-4xl": { _uiElement: "corner", radius: 32 },
	"rounded-full": { _uiElement: "corner", radius: 9999 },

	// Border utilities
	"border-0": { _uiElement: "stroke", thickness: 0 },
	border: { _uiElement: "stroke", thickness: 1 },
	"border-2": { _uiElement: "stroke", thickness: 2 },
	"border-4": { _uiElement: "stroke", thickness: 4 },
	"border-8": { _uiElement: "stroke", thickness: 8 },

	// Shadow utilities
	shadow: { _uiElement: "stroke", thickness: 1, transparency: 0.1 },
	"shadow-lg": { _uiElement: "stroke", thickness: 2, transparency: 0.1 },

	// Border colors - generates all color variations
	"border-transparent": { _uiElement: "stroke", transparency: 1 },
	...generateBorderColorClasses(),
} as Record<string, ClassMapping>;
