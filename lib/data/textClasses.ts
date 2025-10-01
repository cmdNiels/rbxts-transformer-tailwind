import type ClassMapping from "../../types/ClassMapping";
import generateTextColorClasses from "../utils/colors/generateTextColorClasses";

export default {
	"text-transparent": { TextTransparency: 1 },
	truncate: { TextTruncate: "SplitWord" },
	"text-ellipsis": { TextTruncate: "AtEnd" },
	...generateTextColorClasses(),
} as Record<string, ClassMapping>;
