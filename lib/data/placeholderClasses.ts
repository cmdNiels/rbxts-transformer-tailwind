import type ClassMapping from "../../types/ClassMapping";
import generatePlaceholderColorClasses from "../utils/colors/generatePlaceholderColorClasses";

export default {
	...generatePlaceholderColorClasses(),
} as Record<string, ClassMapping>;
