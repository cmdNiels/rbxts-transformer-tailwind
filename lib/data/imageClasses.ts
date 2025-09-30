import type { ClassMapping } from "../../types";
import generateImageColorClasses from "../utils/colors/generateImageColorClasses";

export default {
	...generateImageColorClasses(),
} as Record<string, ClassMapping>;
