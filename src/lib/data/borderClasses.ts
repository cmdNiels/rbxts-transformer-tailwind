import type ClassMapping from "../../types/ClassMapping";
import generateBorderColorClasses from "../utils/colors/generateBorderColorClasses";

export default {
	// Border radius
	"rounded-none": { _uiElement: { type: "UICorner", CornerRadius: { Offset: 0 } } },
	rounded: { _uiElement: { type: "UICorner", CornerRadius: { Offset: 4 } } },
	"rounded-sm": { _uiElement: { type: "UICorner", CornerRadius: { Offset: 2 } } },
	"rounded-md": { _uiElement: { type: "UICorner", CornerRadius: { Offset: 6 } } },
	"rounded-lg": { _uiElement: { type: "UICorner", CornerRadius: { Offset: 8 } } },
	"rounded-xl": { _uiElement: { type: "UICorner", CornerRadius: { Offset: 12 } } },
	"rounded-2xl": { _uiElement: { type: "UICorner", CornerRadius: { Offset: 16 } } },
	"rounded-3xl": { _uiElement: { type: "UICorner", CornerRadius: { Offset: 24 } } },
	"rounded-4xl": { _uiElement: { type: "UICorner", CornerRadius: { Offset: 32 } } },
	"rounded-full": { _uiElement: { type: "UICorner", CornerRadius: { Offset: 9999 } } },

	// Border utilities
	"border-0": { _uiElement: { type: "UIStroke", Thickness: 0 } },
	border: { _uiElement: { type: "UIStroke", Thickness: 1 } },
	"border-2": { _uiElement: { type: "UIStroke", Thickness: 2 } },
	"border-4": { _uiElement: { type: "UIStroke", Thickness: 4 } },
	"border-8": { _uiElement: { type: "UIStroke", Thickness: 8 } },

	// Shadow utilities
	shadow: { _uiElement: { type: "UIStroke", Thickness: 1, Transparency: 0.1 } },
	"shadow-lg": { _uiElement: { type: "UIStroke", Thickness: 2, Transparency: 0.1 } },

	// Border colors - generates all color variations
	"border-transparent": { _uiElement: { type: "UIStroke", Transparency: 1 } },
	...generateBorderColorClasses(),
} satisfies Record<string, ClassMapping>;
