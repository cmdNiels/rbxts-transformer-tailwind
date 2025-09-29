import { ClassMapping } from "../../types";

export default {
	"p-1": { _uiElement: "padding", all: 4 },
	"p-2": { _uiElement: "padding", all: 8 },
	"p-3": { _uiElement: "padding", all: 12 },
	"p-4": { _uiElement: "padding", all: 16 },
	"p-6": { _uiElement: "padding", all: 24 },
	"p-8": { _uiElement: "padding", all: 32 },
	"px-2": { _uiElement: "padding", horizontal: 8 },
	"px-4": { _uiElement: "padding", horizontal: 16 },
	"px-6": { _uiElement: "padding", horizontal: 24 },
	"py-2": { _uiElement: "padding", vertical: 8 },
	"py-4": { _uiElement: "padding", vertical: 16 },
	"py-6": { _uiElement: "padding", vertical: 24 },
} as Record<string, ClassMapping>;
