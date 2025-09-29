import generateTextColorClasses from "@/lib/utils/colors/generateTextColorClasses";
import type { ClassMapping } from "@/types";

export default {
	...generateTextColorClasses(),
} as Record<string, ClassMapping>;
