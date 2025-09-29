import generatePlaceholderColorClasses from "@/lib/utils/colors/generatePlaceholderColorClasses";
import type { ClassMapping } from "@/types";

export default {
	...generatePlaceholderColorClasses(),
} as Record<string, ClassMapping>;
