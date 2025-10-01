import type { ClassMapping } from "../../types";
import generateTextColorClasses from "../utils/colors/generateTextColorClasses";

export default {
	"text-transparent": { TextTransparency: 1 },
	...generateTextColorClasses(),
} as Record<string, ClassMapping>;
