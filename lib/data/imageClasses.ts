import generateImageColorClasses from "@/lib/utils/colors/generateImageColorClasses";
import type { ClassMapping } from "@/types";

export default {
	...generateImageColorClasses(),
} as Record<string, ClassMapping>;
