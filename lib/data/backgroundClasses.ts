import type { ClassMapping } from "../../types";
import generateBackgroundColorClasses from "../utils/colors/generateBackgroundColorClasses";

export default {
	"bg-transparent": { BackgroundTransparency: 1 },
	...generateBackgroundColorClasses(),
} as Record<string, ClassMapping>;
