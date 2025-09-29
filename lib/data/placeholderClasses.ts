import { ClassMapping } from "../../types";
import generatePlaceholderColorClasses from "../utils/colors/generatePlaceholderColorClasses";

export default {
	...generatePlaceholderColorClasses(),
} as Record<string, ClassMapping>;
