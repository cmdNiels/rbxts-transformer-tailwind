import type { ClassMapping } from "../../types";

export default {
	// General opacity-* classes removed due to conflicts with existing UIStroke elements
	// Use specific opacity classes instead: bg-opacity-*, border-opacity-*

	// Background Opacity
	"bg-opacity-0": { BackgroundTransparency: 1 },
	"bg-opacity-5": { BackgroundTransparency: 0.95 },
	"bg-opacity-10": { BackgroundTransparency: 0.9 },
	"bg-opacity-20": { BackgroundTransparency: 0.8 },
	"bg-opacity-25": { BackgroundTransparency: 0.75 },
	"bg-opacity-30": { BackgroundTransparency: 0.7 },
	"bg-opacity-40": { BackgroundTransparency: 0.6 },
	"bg-opacity-50": { BackgroundTransparency: 0.5 },
	"bg-opacity-60": { BackgroundTransparency: 0.4 },
	"bg-opacity-70": { BackgroundTransparency: 0.3 },
	"bg-opacity-75": { BackgroundTransparency: 0.25 },
	"bg-opacity-80": { BackgroundTransparency: 0.2 },
	"bg-opacity-90": { BackgroundTransparency: 0.1 },
	"bg-opacity-95": { BackgroundTransparency: 0.05 },
	"bg-opacity-100": { BackgroundTransparency: 0 },

	// Text Opacity
	"text-opacity-0": { TextTransparency: 1 },
	"text-opacity-5": { TextTransparency: 0.95 },
	"text-opacity-10": { TextTransparency: 0.9 },
	"text-opacity-20": { TextTransparency: 0.8 },
	"text-opacity-25": { TextTransparency: 0.75 },
	"text-opacity-30": { TextTransparency: 0.7 },
	"text-opacity-40": { TextTransparency: 0.6 },
	"text-opacity-50": { TextTransparency: 0.5 },
	"text-opacity-60": { TextTransparency: 0.4 },
	"text-opacity-70": { TextTransparency: 0.3 },
	"text-opacity-75": { TextTransparency: 0.25 },
	"text-opacity-80": { TextTransparency: 0.2 },
	"text-opacity-90": { TextTransparency: 0.1 },
	"text-opacity-95": { TextTransparency: 0.05 },
	"text-opacity-100": { TextTransparency: 0 },

	// Image Opacity
	"image-opacity-0": { ImageTransparency: 1 },
	"image-opacity-5": { ImageTransparency: 0.95 },
	"image-opacity-10": { ImageTransparency: 0.9 },
	"image-opacity-20": { ImageTransparency: 0.8 },
	"image-opacity-25": { ImageTransparency: 0.75 },
	"image-opacity-30": { ImageTransparency: 0.7 },
	"image-opacity-40": { ImageTransparency: 0.6 },
	"image-opacity-50": { ImageTransparency: 0.5 },
	"image-opacity-60": { ImageTransparency: 0.4 },
	"image-opacity-70": { ImageTransparency: 0.3 },
	"image-opacity-75": { ImageTransparency: 0.25 },
	"image-opacity-80": { ImageTransparency: 0.2 },
	"image-opacity-90": { ImageTransparency: 0.1 },
	"image-opacity-95": { ImageTransparency: 0.05 },
	"image-opacity-100": { ImageTransparency: 0 },

	// Border Opacity
	"border-opacity-0": { _uiElement: { type: "UIStroke", transparency: 1 } },
	"border-opacity-5": { _uiElement: { type: "UIStroke", transparency: 0.95 } },
	"border-opacity-10": { _uiElement: { type: "UIStroke", transparency: 0.9 } },
	"border-opacity-20": { _uiElement: { type: "UIStroke", transparency: 0.8 } },
	"border-opacity-25": { _uiElement: { type: "UIStroke", transparency: 0.75 } },
	"border-opacity-30": { _uiElement: { type: "UIStroke", transparency: 0.7 } },
	"border-opacity-40": { _uiElement: { type: "UIStroke", transparency: 0.6 } },
	"border-opacity-50": { _uiElement: { type: "UIStroke", transparency: 0.5 } },
	"border-opacity-60": { _uiElement: { type: "UIStroke", transparency: 0.4 } },
	"border-opacity-70": { _uiElement: { type: "UIStroke", transparency: 0.3 } },
	"border-opacity-75": { _uiElement: { type: "UIStroke", transparency: 0.25 } },
	"border-opacity-80": { _uiElement: { type: "UIStroke", transparency: 0.2 } },
	"border-opacity-90": { _uiElement: { type: "UIStroke", transparency: 0.1 } },
	"border-opacity-95": { _uiElement: { type: "UIStroke", transparency: 0.05 } },
	"border-opacity-100": { _uiElement: { type: "UIStroke", transparency: 0 } },
} as Record<string, ClassMapping>;
