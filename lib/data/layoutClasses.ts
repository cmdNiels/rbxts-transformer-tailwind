import { ClassMapping } from "../../types";

export default {
	flex: { _uiElement: "listLayout", direction: "Horizontal" },
	"flex-col": { _uiElement: "listLayout", direction: "Vertical" },
	"justify-center": { _uiElement: "listLayout", horizontalAlignment: "Center" },
	"justify-start": { _uiElement: "listLayout", horizontalAlignment: "Left" },
	"justify-end": { _uiElement: "listLayout", horizontalAlignment: "Right" },
	"items-center": { _uiElement: "listLayout", verticalAlignment: "Center" },
	"items-start": { _uiElement: "listLayout", verticalAlignment: "Top" },
	"items-end": { _uiElement: "listLayout", verticalAlignment: "Bottom" },
} as Record<string, ClassMapping>;
