import generateBackgroundColorClasses from "@/lib/utils/colors/generateBackgroundColorClasses";
import type { ClassMapping } from "@/types";

export default {
	"bg-transparent": { BackgroundTransparency: 1 },
	...generateBackgroundColorClasses(),
} as Record<string, ClassMapping>;
