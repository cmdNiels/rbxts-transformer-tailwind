import type { ClassMapping } from "../../types";
import generateBorderColorClasses from "../utils/colors/generateBorderColorClasses";

export default {
	// Border radius
	"rounded-none": { _uiElement: { type: "UICorner", radius: 0 } },
	rounded: { _uiElement: { type: "UICorner", radius: 4 } },
	"rounded-sm": { _uiElement: { type: "UICorner", radius: 2 } },
	"rounded-md": { _uiElement: { type: "UICorner", radius: 6 } },
	"rounded-lg": { _uiElement: { type: "UICorner", radius: 8 } },
	"rounded-xl": { _uiElement: { type: "UICorner", radius: 12 } },
	"rounded-2xl": { _uiElement: { type: "UICorner", radius: 16 } },
	"rounded-3xl": { _uiElement: { type: "UICorner", radius: 24 } },
	"rounded-4xl": { _uiElement: { type: "UICorner", radius: 32 } },
	"rounded-full": { _uiElement: { type: "UICorner", radius: 9999 } },

	// Border utilities
	"border-0": { _uiElement: { type: "UIStroke", thickness: 0 } },
	border: { _uiElement: { type: "UIStroke", thickness: 1 } },
	"border-2": { _uiElement: { type: "UIStroke", thickness: 2 } },
	"border-4": { _uiElement: { type: "UIStroke", thickness: 4 } },
	"border-8": { _uiElement: { type: "UIStroke", thickness: 8 } },

	// Shadow utilities
	shadow: { _uiElement: { type: "UIStroke", thickness: 1, transparency: 0.1 } },
	"shadow-lg": { _uiElement: { type: "UIStroke", thickness: 2, transparency: 0.1 } },

	// Border colors - generates all color variations
	"border-transparent": { _uiElement: { type: "UIStroke", transparency: 1 } },
	...generateBorderColorClasses(),
} as Record<string, ClassMapping>;
